#!/bin/bash

# Script to list all Fargate services across all ECS clusters
# Usage: ./list-fargate-services.sh [cluster-name]
# If cluster-name is provided, only show services in that cluster

FILTER_CLUSTER="$1"

# Function to display services
display_services() {
    echo "SERVICE NAME             STATUS       IMAGE            GIT HASH                                         CLUSTER NAME"
    echo "===================================================================================================================="

    # Get all clusters
    CLUSTERS=$(aws ecs list-clusters --query 'clusterArns[]' --output text)

    if [ -z "$CLUSTERS" ]; then
        echo "No clusters found"
        return
    fi

    # Iterate through each cluster
    echo "$CLUSTERS" | tr '\t' '\n' | while read -r cluster_arn; do
        CLUSTER_NAME=$(basename "$cluster_arn")

        # Skip clusters with "delivery" anywhere in the name (case-insensitive)
        if echo "$CLUSTER_NAME" | grep -iq "delivery"; then
            continue
        fi

        # Skip if filter is set and this cluster doesn't match
        if [ -n "$FILTER_CLUSTER" ] && [ "$CLUSTER_NAME" != "$FILTER_CLUSTER" ]; then
            continue
        fi

        # Get list of service ARNs in this cluster
        SERVICE_ARNS=$(aws ecs list-services --cluster "$CLUSTER_NAME" --query 'serviceArns[]' --output text)

        if [ -z "$SERVICE_ARNS" ]; then
            continue
        fi

        # Describe services to get details and filter for Fargate
        echo "$SERVICE_ARNS" | tr '\t' '\n' | while read -r service_arn; do
        # Get service details including capacity providers
        SERVICE_JSON=$(aws ecs describe-services \
            --cluster "$CLUSTER_NAME" \
            --services "$service_arn" \
            --query 'services[0]')

        SERVICE_NAME=$(echo "$SERVICE_JSON" | jq -r '.serviceName')

        # Skip services with "delivery" anywhere in the name (case-insensitive)
        if echo "$SERVICE_NAME" | grep -iq "delivery"; then
            continue
        fi

        STATUS=$(echo "$SERVICE_JSON" | jq -r '.status')
        LAUNCH_TYPE=$(echo "$SERVICE_JSON" | jq -r '.launchType')
        CAPACITY_PROVIDERS=$(echo "$SERVICE_JSON" | jq -r '.capacityProviderStrategy[]?.capacityProvider' 2>/dev/null)
        TASK_DEFINITION=$(echo "$SERVICE_JSON" | jq -r '.taskDefinition')

        # Check if it's a Fargate service (either launchType=FARGATE or using FARGATE/FARGATE_SPOT capacity providers)
        IS_FARGATE=false
        if [ "$LAUNCH_TYPE" = "FARGATE" ]; then
            IS_FARGATE=true
        elif echo "$CAPACITY_PROVIDERS" | grep -qE "^FARGATE|^FARGATE_SPOT"; then
            IS_FARGATE=true
        fi

        if [ "$IS_FARGATE" = "true" ]; then
            # Get the task definition to extract image info
            TASK_DEF_JSON=$(aws ecs describe-task-definition --task-definition "$TASK_DEFINITION" --query 'taskDefinition.containerDefinitions[0].image' --output text)

            # Extract repository and tag
            # Format: 395833734759.dkr.ecr.us-west-1.amazonaws.com/platform/web:tag
            REGISTRY=$(echo "$TASK_DEF_JSON" | sed -E 's|([^/]+)/.*|\1|')
            # Extract full repository path (e.g., "platform/web")
            REPO_PATH=$(echo "$TASK_DEF_JSON" | sed -E 's|[^/]+/(.+):.*|\1|')
            # Extract just the image name (last part after /)
            IMAGE_NAME=$(echo "$TASK_DEF_JSON" | sed -E 's|.*/([^:]+):.*|\1|')
            CURRENT_TAG=$(echo "$TASK_DEF_JSON" | sed -E 's|.*:(.+)|\1|')

            # Truncate service name if needed (max 24)
            DISPLAY_SERVICE_NAME="$SERVICE_NAME"
            if [ ${#DISPLAY_SERVICE_NAME} -gt 24 ]; then
                DISPLAY_SERVICE_NAME="${DISPLAY_SERVICE_NAME:0:21}..."
            fi

            # Truncate status if needed (max 12)
            DISPLAY_STATUS="$STATUS"
            if [ ${#DISPLAY_STATUS} -gt 12 ]; then
                DISPLAY_STATUS="${DISPLAY_STATUS:0:9}..."
            fi

            # Try to get all tags for this image from ECR
            ALL_TAGS=""
            if [[ "$TASK_DEF_JSON" =~ ecr ]]; then
                # Get image digest for current tag
                IMAGE_DIGEST=$(aws ecr describe-images \
                    --repository-name "$REPO_PATH" \
                    --image-ids imageTag="$CURRENT_TAG" \
                    --query 'imageDetails[0].imageDigest' \
                    --output text 2>/dev/null)

                if [ -n "$IMAGE_DIGEST" ] && [ "$IMAGE_DIGEST" != "None" ]; then
                    # Get all tags that point to this digest
                    ALL_TAGS=$(aws ecr describe-images \
                        --repository-name "$REPO_PATH" \
                        --image-ids imageDigest="$IMAGE_DIGEST" \
                        --query 'imageDetails[0].imageTags[]' \
                        --output text 2>/dev/null | tr '\t' ' ')
                fi
            fi

            # If we couldn't get tags from ECR, use the current tag
            if [ -z "$ALL_TAGS" ]; then
                ALL_TAGS="$CURRENT_TAG"
            fi

            # Parse and categorize tags
            BRANCH_TAGS=""
            PR_TAGS=""
            HASH_TAG=""

            for tag in $ALL_TAGS; do
                # Check if it's a full git hash (40 hex chars)
                if [[ "$tag" =~ ^[0-9a-f]{40}$ ]]; then
                    HASH_TAG="${tag:0:8}"
                # Check if it contains PR- pattern
                elif [[ "$tag" =~ PR-[0-9]+ ]]; then
                    PR_NUM=$(echo "$tag" | grep -oE 'PR-[0-9]+')
                    PR_TAGS="$PR_TAGS $PR_NUM"
                else
                    # Treat as branch/environment tag
                    BRANCH_TAGS="$BRANCH_TAGS $tag"
                fi
            done

            # Build display string: "(hash) branch1 branch2 PR-123 PR-456"
            TAGS_DISPLAY=""
            if [ -n "$HASH_TAG" ]; then
                TAGS_DISPLAY="($HASH_TAG)"
            fi
            if [ -n "$BRANCH_TAGS" ]; then
                BRANCH_TAGS_TRIMMED=$(echo "$BRANCH_TAGS" | xargs)
                if [ -n "$TAGS_DISPLAY" ]; then
                    TAGS_DISPLAY="$TAGS_DISPLAY $BRANCH_TAGS_TRIMMED"
                else
                    TAGS_DISPLAY="$BRANCH_TAGS_TRIMMED"
                fi
            fi
            if [ -n "$PR_TAGS" ]; then
                PR_TAGS_TRIMMED=$(echo "$PR_TAGS" | xargs)
                if [ -n "$TAGS_DISPLAY" ]; then
                    TAGS_DISPLAY="$TAGS_DISPLAY $PR_TAGS_TRIMMED"
                else
                    TAGS_DISPLAY="$PR_TAGS_TRIMMED"
                fi
            fi

            # Truncate all display values to fit column widths
            # Service name (max 24)
            DISPLAY_SERVICE_NAME="$SERVICE_NAME"
            if [ ${#DISPLAY_SERVICE_NAME} -gt 24 ]; then
                DISPLAY_SERVICE_NAME="${DISPLAY_SERVICE_NAME:0:21}..."
            fi

            # Status (max 12)
            DISPLAY_STATUS="$STATUS"
            if [ ${#DISPLAY_STATUS} -gt 12 ]; then
                DISPLAY_STATUS="${DISPLAY_STATUS:0:9}..."
            fi

            # Image name (max 16, keep last chars with ...)
            DISPLAY_IMAGE_NAME="$IMAGE_NAME"
            if [ ${#DISPLAY_IMAGE_NAME} -gt 16 ]; then
                DISPLAY_IMAGE_NAME="...${DISPLAY_IMAGE_NAME: -13}"
            fi

            # Tags display (max 48)
            DISPLAY_TAGS="$TAGS_DISPLAY"
            if [ ${#DISPLAY_TAGS} -gt 48 ]; then
                DISPLAY_TAGS="${DISPLAY_TAGS:0:45}..."
            fi

            # Cluster name (max 16, keep first chars with ...)
            DISPLAY_CLUSTER_NAME="$CLUSTER_NAME"
            if [ ${#DISPLAY_CLUSTER_NAME} -gt 16 ]; then
                DISPLAY_CLUSTER_NAME="${DISPLAY_CLUSTER_NAME:0:13}..."
            fi

            printf "%-24s %-12s %-16s %-48s %-16s\n" "$DISPLAY_SERVICE_NAME" "$DISPLAY_STATUS" "$DISPLAY_IMAGE_NAME" "$DISPLAY_TAGS" "$DISPLAY_CLUSTER_NAME"
        fi
    done
    done

    echo ""
}

# Run once
display_services

#!/bin/bash

# Script to connect to an ECS container via SSM
# Usage: ./ecs-connect.sh <task-name> [environment] [-cmd "command"]
# Example: ./ecs-connect.sh web training
# Example: ./ecs-connect.sh api training -cmd "python manage.py diffsettings"

set -e

# Configuration
CLUSTER="cms-common"
REGION="us-west-1"

# Parse arguments
TASK_NAME="${1}"
ENVIRONMENT="${2:-develop}"
CUSTOM_COMMAND=""

# Check for -cmd flag
shift 2 2>/dev/null || shift 1 2>/dev/null || true
while [[ $# -gt 0 ]]; do
  case $1 in
    -cmd)
      CUSTOM_COMMAND="$2"
      shift 2
      ;;
    *)
      shift
      ;;
  esac
done

# Validate required arguments
if [ -z "$TASK_NAME" ]; then
  echo "Error: Task name is required"
  echo "Usage: $0 <task-name> [environment] [-cmd \"command\"]"
  echo "Example: $0 web training"
  echo "Example: $0 api training -cmd \"python manage.py diffsettings\""
  exit 1
fi

# Construct service name
SERVICE_NAME="cms-${ENVIRONMENT}-${TASK_NAME}"

echo "Connecting to service: $SERVICE_NAME in cluster: $CLUSTER"

# List running tasks for the service
echo "Finding running tasks..."
TASK_ARNS=$(aws ecs list-tasks \
  --cluster "$CLUSTER" \
  --service-name "$SERVICE_NAME" \
  --desired-status RUNNING \
  --region "$REGION" \
  --query 'taskArns[0]' \
  --output text)

# Check if any tasks were found
if [ -z "$TASK_ARNS" ] || [ "$TASK_ARNS" = "None" ]; then
  echo "Error: No running tasks found for service $SERVICE_NAME"
  exit 1
fi

echo "Found task: $TASK_ARNS"

# Get task details to find container name
CONTAINER_NAME=$(aws ecs describe-tasks \
  --cluster "$CLUSTER" \
  --tasks "$TASK_ARNS" \
  --region "$REGION" \
  --query 'tasks[0].containers[0].name' \
  --output text)

echo "Container name: $CONTAINER_NAME"
echo "Connecting via SSM..."
echo ""

# Determine command to execute
if [ -z "$CUSTOM_COMMAND" ]; then
  EXEC_COMMAND="/bin/bash"
else
  EXEC_COMMAND="$CUSTOM_COMMAND"
  echo "Running command: $EXEC_COMMAND"
  echo ""
fi

# Execute command to connect to the container
aws ecs execute-command \
  --cluster "$CLUSTER" \
  --task "$TASK_ARNS" \
  --container "$CONTAINER_NAME" \
  --interactive \
  --command "$EXEC_COMMAND" \
  --region "$REGION"

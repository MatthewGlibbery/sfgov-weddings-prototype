# CMS Frontend Infrastructure

This directory contains Terraform configuration for the CMS frontend infrastructure on AWS ECS.

## Architecture

- **Route 53** - DNS records for environment domains
- **CloudFront** - CDN distribution with WAF protection
- **Application Load Balancer** (shared `cms-common`) - Routes traffic to ECS services
  - Listener rules for host-based routing
  - Target groups for ECS services
- **ECS Cluster** (`cms-common`) - Shared Fargate cluster
  - Task definitions with container specs
  - Services with auto-scaling and health checks
  - Tasks running in VPC with security groups

## Infrastructure Resources

### Shared Resources
- VPC: `platform_vpc` (existing)
- Subnets: Auto-discovered loadbalancer subnets (existing)
- Security Groups: Platform training security groups (existing)
- IAM Roles: `platform-ecsTaskRole`, `platform-ecsTaskExecutionRole` (existing)
- ALB: `cms-common` (managed by this Terraform config)
- ECS Cluster: `cms-common` (managed by this Terraform config)

### Per-Environment Resources
- ECS Task Definition
- ECS Service
- Target Group
- ALB Listener Rule
- CloudFront Distribution
- WAF Web ACL
- Route 53 Record

## Environments

### Training
- **Service**: `cms-training-web`
- **URL**: https://web-training-ecs.dev.sf.gov
- **Image**: `395833734759.dkr.ecr.us-west-1.amazonaws.com/platform/web:infra`
- **Task CPU/Memory**: 1024/2048

## Usage

### Setup Terraform

#### Install Prerequisites

**AWS CLI**:
```bash
# macOS (Homebrew)
brew install awscli
```

Configure credentials:
```bash
aws configure
```

You'll be prompted for:
- **AWS Access Key ID**: Your IAM user access key
- **AWS Secret Access Key**: Your IAM user secret key
- **Default region**: `us-west-1`
- **Default output format**: `json` (recommended)

**Terraform**:
```bash
# macOS (Homebrew)
brew install terraform
```

#### Initial Setup

1. **Verify AWS credentials**:
   ```bash
   aws sts get-caller-identity
   ```
   Should show account `395833734759`

2. **Initialize Terraform**:
   ```bash
   cd infra
   terraform init
   ```
   This downloads required providers and configures the S3 backend with state locking.

### Verify Changes

Before applying changes, always preview what Terraform will do:

```bash
cd infra
terraform plan
```

The plan output shows:
- Resources to be created (`+`)
- Resources to be modified (`~`)
- Resources to be destroyed (`-`)

Review carefully, especially:
- Any resources marked for destruction
- Changes to production resources
- Security group or IAM role modifications

### Apply Changes

Once you've reviewed the plan and confirmed it's correct:

```bash
cd infra
terraform apply
```

Terraform will:
1. Show the plan again
2. Prompt for confirmation (type `yes`)
3. Apply changes sequentially
4. Display outputs when complete

For non-interactive apply (use with caution):
```bash
terraform apply -auto-approve
```

### Connect to Running Container

Use the ECS connect script:

```bash
./scripts/ecs-connect.sh web training
```

### Update Docker Image

The training environment uses the `infra` image tag. To update:

1. Push changes to the `infra` branch
2. CircleCI builds and pushes the image
3. CircleCI restarts the ECS service automatically

## Module Structure

The `modules/cms` directory contains a reusable module for deploying CMS environments with:
- Auto-discovery of VPC, subnets, and security groups
- Configurable CPU, memory, and scaling
- Integrated CloudFront + WAF protection
- Health checks and deployment circuit breakers

## Configuration

Key variables in `main.tf`:
- `environment` - Environment name (training, staging, production)
- `container_image` - Docker image to deploy
- `api_base_url` - Backend API endpoint
- `host_header` - Domain name for routing
- `task_cpu` / `task_memory` - Resource allocation
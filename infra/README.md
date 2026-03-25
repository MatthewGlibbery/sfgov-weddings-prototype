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

### Shared Resources (existing)
- VPC: `platform_vpc`
- Subnets: Auto-discovered loadbalancer subnets
- Security Groups: Platform training security groups
- IAM Roles: `platform-ecsTaskRole`, `platform-ecsTaskExecutionRole`
- ALB: `cms-common`
- ECS Cluster: `cms-common`

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

### Apply Infrastructure Changes

```bash
cd infra
terraform init
terraform plan
terraform apply
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
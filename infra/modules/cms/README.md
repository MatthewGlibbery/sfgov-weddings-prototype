# CMS Module

This module creates the infrastructure for a CMS Next.js web application environment.

## Resources Created

- ECS Task Definition (Fargate)
- ECS Service
- Application Load Balancer Target Group

## Usage

```hcl
module "cms_training" {
  source = "./modules/cms"

  environment            = "training"
  vpc_id                 = "vpc-0be74497dcddf02a8"
  subnets                = ["subnet-0e8ca1ae723d17550", "subnet-0af5858b570b99beb"]
  security_groups        = ["sg-02fbfdbc5fefd15bc", "sg-0562ac57bdd3033e9"]
  alb_security_groups    = ["sg-0ea54c21fd6940771", "sg-0abc71626ad3557d7"]
  cluster_arn            = "arn:aws:ecs:us-west-1:123456789012:cluster/cms-common"
  task_role_arn          = "arn:aws:iam::123456789012:role/ecsTaskRole"
  execution_role_arn     = "arn:aws:iam::123456789012:role/ecsTaskExecutionRole"
  container_image        = "123456789012.dkr.ecr.us-west-1.amazonaws.com/platform/web:training"
  api_base_url           = "https://api-training.dev.sf.gov"

  common_tags = {
    ProductTeam = "cms"
    ManagedBy   = "terraform"
    Repository  = "cms-next"
  }
}
```

## Inputs

| Name | Description | Type | Default | Required |
|------|-------------|------|---------|----------|
| environment | Environment name (e.g., training, staging, production) | string | - | yes |
| vpc_id | VPC ID for the resources | string | - | yes |
| subnets | List of subnet IDs | list(string) | - | yes |
| security_groups | List of security group IDs for ECS service | list(string) | - | yes |
| alb_security_groups | List of security group IDs for ALB | list(string) | - | yes |
| cluster_arn | ARN of the ECS cluster | string | - | yes |
| task_role_arn | ARN of the ECS task role | string | - | yes |
| execution_role_arn | ARN of the ECS task execution role | string | - | yes |
| container_image | Docker image for the container | string | - | yes |
| api_base_url | API base URL for the application | string | - | yes |
| task_cpu | CPU units for the ECS task | string | "1024" | no |
| task_memory | Memory for the ECS task | string | "2048" | no |
| desired_count | Desired number of ECS tasks | number | 1 | no |
| common_tags | Common tags to apply to all resources | map(string) | {} | no |

## Outputs

| Name | Description |
|------|-------------|
| task_definition_arn | ARN of the ECS task definition |
| task_definition_family | Family of the ECS task definition |
| service_name | Name of the ECS service |
| service_id | ID of the ECS service |
| target_group_arn | ARN of the target group |
| target_group_name | Name of the target group |

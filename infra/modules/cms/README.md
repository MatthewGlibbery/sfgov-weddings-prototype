# CMS Module

This module creates the infrastructure for a CMS Next.js web application environment on AWS ECS Fargate with CloudFront CDN and WAF protection.

## Features

- **Auto-discovery**: Automatically discovers VPC, subnets, security groups, IAM roles, and ACM certificates
- **CloudFront CDN**: Integrated CDN with custom domain
- **WAF Protection**: AWS managed rule sets for security
- **Health Checks**: Container and ALB health monitoring
- **Circuit Breaker**: Automatic rollback on failed deployments
- **ECS Exec**: Enabled for container debugging

## Resources Created

- ECS Task Definition (Fargate)
- ECS Service with auto-scaling
- Application Load Balancer Target Group
- ALB Listener Rule (host-based routing)
- CloudFront Distribution
- WAF v2 Web ACL
- Route 53 DNS Record

## Usage

### Minimal Example (with auto-discovery)

```hcl
module "cms_training" {
  source = "./modules/cms"

  providers = {
    aws.us-east-1 = aws.us-east-1  # Required for CloudFront/WAF
  }

  environment            = "training"
  cluster_arn            = aws_ecs_cluster.cms_common.arn
  api_base_url           = "https://api-training.dev.sf.gov"
  listener_arn           = "arn:aws:elasticloadbalancing:us-west-1:123456789012:listener/app/cms-common/xxx/yyy"
  listener_rule_priority = 10
  host_header            = "web-training-ecs.dev.sf.gov"
  alb_dns_name           = aws_lb.cms_common.dns_name

  common_tags = {
    ProductTeam = "cms"
    ManagedBy   = "terraform"
  }
}
```

### Full Example (explicit configuration)

```hcl
module "cms_training" {
  source = "./modules/cms"

  providers = {
    aws.us-east-1 = aws.us-east-1
  }

  environment            = "training"
  cluster_arn            = aws_ecs_cluster.cms_common.arn
  api_base_url           = "https://api-training.dev.sf.gov"
  listener_arn           = "arn:aws:elasticloadbalancing:us-west-1:123456789012:listener/app/cms-common/xxx/yyy"
  listener_rule_priority = 10
  host_header            = "web-training-ecs.dev.sf.gov"
  alb_dns_name           = aws_lb.cms_common.dns_name

  # Optional: Override auto-discovery
  vpc_id                 = "vpc-xxx"
  subnets                = ["subnet-xxx", "subnet-yyy"]
  security_groups        = ["sg-xxx", "sg-yyy"]
  alb_security_groups    = ["sg-zzz"]
  container_image        = "123456789012.dkr.ecr.us-west-1.amazonaws.com/platform/web:custom-tag"
  task_role_arn          = "arn:aws:iam::123456789012:role/custom-task-role"
  execution_role_arn     = "arn:aws:iam::123456789012:role/custom-execution-role"
  route53_zone_id        = "Z123456789"
  acm_certificate_arn    = "arn:aws:acm:us-east-1:123456789012:certificate/xxx"

  # Resource sizing
  task_cpu      = "2048"
  task_memory   = "4096"
  desired_count = 2

  common_tags = {
    ProductTeam = "cms"
    ManagedBy   = "terraform"
  }
}
```

## Auto-Discovery

The module automatically discovers the following resources if not explicitly provided:

- **VPC**: `platform_vpc`
- **Subnets**: Tagged with `Availability=loadbalancers`
- **Security Groups**:
  - `platform-training-postgres-sg`
  - `training-efs-ec2-sg`
  - `platform-training-alb-web-sg`
  - `platform-training-elb-alb-sg`
- **ALB Security Groups**:
  - `platform-cf-ec2-web`
  - `cms-cf-alb-web-sg`
- **IAM Roles**:
  - Task Role: `platform-ecsTaskRole`
  - Execution Role: `platform-ecsTaskExecutionRole`
- **Route 53 Zone**: `dev.sf.gov`
- **ACM Certificate**: `*.dev.sf.gov` (in us-east-1)
- **Container Image**: `395833734759.dkr.ecr.us-west-1.amazonaws.com/platform/web:{environment}`

## Inputs

| Name | Description | Type | Default | Required |
|------|-------------|------|---------|----------|
| environment | Environment name (e.g., training, staging, production) | string | - | yes |
| cluster_arn | ARN of the ECS cluster | string | - | yes |
| api_base_url | API base URL for the application | string | - | yes |
| listener_arn | ARN of the ALB listener to attach the rule to | string | - | yes |
| listener_rule_priority | Priority for the listener rule | number | - | yes |
| host_header | Host header value for routing (e.g., web-training-ecs.dev.sf.gov) | string | - | yes |
| alb_dns_name | DNS name of the Application Load Balancer | string | - | yes |
| vpc_id | VPC ID (auto-discovered if empty) | string | "" | no |
| subnets | List of subnet IDs (auto-discovered if empty) | list(string) | [] | no |
| security_groups | List of security group IDs for ECS service (auto-discovered if empty) | list(string) | [] | no |
| alb_security_groups | List of security group IDs for ALB (auto-discovered if empty) | list(string) | [] | no |
| task_role_arn | ARN of the ECS task role (auto-discovered if empty) | string | "" | no |
| execution_role_arn | ARN of the ECS task execution role (auto-discovered if empty) | string | "" | no |
| container_image | Docker image (auto-generated if empty) | string | "" | no |
| route53_zone_id | Route53 hosted zone ID (auto-discovered if empty) | string | "" | no |
| acm_certificate_arn | ARN of the ACM certificate (auto-discovered if empty) | string | "" | no |
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
| cloudfront_distribution_id | ID of the CloudFront distribution |
| cloudfront_domain_name | Domain name of the CloudFront distribution |
| route53_record_fqdn | FQDN of the Route 53 record |
| waf_web_acl_id | ID of the WAF Web ACL |

## Notes

- Requires a provider alias `aws.us-east-1` for CloudFront and WAF resources
- ECS Exec is enabled for container debugging via SSM
- Deployment uses circuit breaker with automatic rollback on failure
- Health checks are configured for both container and ALB
- WAF includes managed rule sets for common threats
variable "environment" {
  description = "Environment name (e.g., training, staging, production)"
  type        = string
}

variable "common_tags" {
  description = "Common tags to apply to all resources"
  type        = map(string)
  default     = {}
}

variable "vpc_id" {
  description = "VPC ID for the resources (leave empty to auto-discover platform VPC)"
  type        = string
  default     = ""
}

variable "subnets" {
  description = "List of subnet IDs for the load balancer and ECS service (leave empty to auto-discover loadbalancer subnets)"
  type        = list(string)
  default     = []
}

variable "security_groups" {
  description = "List of security group IDs for the ECS service (leave empty to auto-discover platform security groups)"
  type        = list(string)
  default     = []
}

variable "alb_security_groups" {
  description = "List of security group IDs for the ALB (leave empty to auto-discover ALB security groups)"
  type        = list(string)
  default     = []
}

variable "task_cpu" {
  description = "CPU units for the ECS task"
  type        = string
  default     = "1024"
}

variable "task_memory" {
  description = "Memory for the ECS task"
  type        = string
  default     = "2048"
}

variable "desired_count" {
  description = "Desired number of ECS tasks"
  type        = number
  default     = 1
}

variable "cluster_arn" {
  description = "ARN of the ECS cluster"
  type        = string
}

variable "task_role_arn" {
  description = "ARN of the ECS task role (leave empty to use platform-ecsTaskRole)"
  type        = string
  default     = ""
}

variable "execution_role_arn" {
  description = "ARN of the ECS task execution role (leave empty to use platform-ecsTaskExecutionRole)"
  type        = string
  default     = ""
}

variable "container_image" {
  description = "Docker image for the container (leave empty to use default: 395833734759.dkr.ecr.us-west-1.amazonaws.com/platform/web:<environment>)"
  type        = string
  default     = ""
}

variable "api_base_url" {
  description = "API base URL for the application"
  type        = string
}

variable "listener_arn" {
  description = "ARN of the ALB listener to attach the rule to"
  type        = string
}

variable "listener_rule_priority" {
  description = "Priority for the listener rule"
  type        = number
}

variable "host_header" {
  description = "Host header value for routing (e.g., web-training-ecs.dev.sf.gov)"
  type        = string
}

variable "alb_dns_name" {
  description = "DNS name of the Application Load Balancer"
  type        = string
}

variable "acm_certificate_arn" {
  description = "ARN of the ACM certificate for HTTPS (leave empty to use *.dev.sf.gov certificate)"
  type        = string
  default     = ""
}

variable "route53_zone_id" {
  description = "Route53 hosted zone ID (leave empty to auto-discover dev.sf.gov zone)"
  type        = string
  default     = ""
}

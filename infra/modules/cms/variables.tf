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

variable "web_task_cpu" {
  description = "CPU units for the web ECS task"
  type        = string
  default     = "1024"
}

variable "web_task_memory" {
  description = "Memory for the web ECS task"
  type        = string
  default     = "2048"
}

variable "web_desired_count" {
  description = "Desired number of web ECS tasks"
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

variable "web_container_image" {
  description = "Docker image for the web container (leave empty to use default: 395833734759.dkr.ecr.us-west-1.amazonaws.com/platform/web:<environment>)"
  type        = string
  default     = ""
}

variable "web_base_url" {
  description = "Web base URL for the application"
  type        = string
}

variable "api_base_url" {
  description = "API base URL for the application"
  type        = string
}

variable "listener_arn" {
  description = "ARN of the ALB listener to attach the rule to"
  type        = string
}

variable "web_listener_rule_priority" {
  description = "Priority for the web listener rule"
  type        = number
}

variable "web_host_header" {
  description = "Host header value for web routing (leave empty to extract from web_base_url)"
  type        = string
  default     = ""
}

variable "alb_dns_name" {
  description = "DNS name of the Application Load Balancer"
  type        = string
}

variable "alb_zone_id" {
  description = "Hosted zone ID of the Application Load Balancer"
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

# API service variables (Wagtail/Django backend)
variable "api_container_image" {
  description = "Docker image for the API container (leave empty to use default: 395833734759.dkr.ecr.us-west-1.amazonaws.com/platform/api:<environment>)"
  type        = string
  default     = ""
}

variable "api_task_cpu" {
  description = "CPU units for the API ECS task"
  type        = string
  default     = "1024"
}

variable "api_task_memory" {
  description = "Memory for the API ECS task"
  type        = string
  default     = "2048"
}

variable "api_desired_count" {
  description = "Desired number of API ECS tasks"
  type        = number
  default     = 1
}

variable "api_host_header" {
  description = "Host header value for API routing (leave empty to use default: api-<environment>.dev.sf.gov)"
  type        = string
  default     = ""
}

variable "api_listener_rule_priority" {
  description = "Priority for the API listener rule"
  type        = number
}

variable "api_secrets_arn" {
  description = "ARN of the Secrets Manager secret containing API database credentials (DB_USERNAME and DB_PASSWORD)"
  type        = string
}

variable "api_db_host" {
  description = "Database host for API"
  type        = string
}

variable "api_db_name" {
  description = "Database name for API"
  type        = string
}

variable "api_db_port" {
  description = "Database port for API"
  type        = string
  default     = "5432"
}

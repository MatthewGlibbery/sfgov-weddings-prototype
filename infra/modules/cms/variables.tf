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
  description = "VPC ID for the resources"
  type        = string
}

variable "subnets" {
  description = "List of subnet IDs for the load balancer and ECS service"
  type        = list(string)
}

variable "security_groups" {
  description = "List of security group IDs for the ECS service"
  type        = list(string)
}

variable "alb_security_groups" {
  description = "List of security group IDs for the ALB"
  type        = list(string)
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
  description = "ARN of the ECS task role"
  type        = string
}

variable "execution_role_arn" {
  description = "ARN of the ECS task execution role"
  type        = string
}

variable "container_image" {
  description = "Docker image for the container"
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

variable "listener_rule_priority" {
  description = "Priority for the listener rule"
  type        = number
}

variable "host_header" {
  description = "Host header value for routing (e.g., web-training-ecs.dev.sf.gov)"
  type        = string
}

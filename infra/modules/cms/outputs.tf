# Web service outputs
output "web_task_definition_arn" {
  description = "ARN of the web ECS task definition"
  value       = aws_ecs_task_definition.web.arn
}

output "web_task_definition_family" {
  description = "Family of the web ECS task definition"
  value       = aws_ecs_task_definition.web.family
}

output "web_service_name" {
  description = "Name of the web ECS service"
  value       = aws_ecs_service.web.name
}

output "web_service_id" {
  description = "ID of the web ECS service"
  value       = aws_ecs_service.web.id
}

output "web_target_group_arn" {
  description = "ARN of the web target group"
  value       = aws_lb_target_group.web.arn
}

output "web_target_group_name" {
  description = "Name of the web target group"
  value       = aws_lb_target_group.web.name
}

# API service outputs
output "api_task_definition_arn" {
  description = "ARN of the API ECS task definition"
  value       = aws_ecs_task_definition.api.arn
}

output "api_task_definition_family" {
  description = "Family of the API ECS task definition"
  value       = aws_ecs_task_definition.api.family
}

output "api_service_name" {
  description = "Name of the API ECS service"
  value       = aws_ecs_service.api.name
}

output "api_service_id" {
  description = "ID of the API ECS service"
  value       = aws_ecs_service.api.id
}

output "api_target_group_arn" {
  description = "ARN of the API target group"
  value       = aws_lb_target_group.api.arn
}

output "api_target_group_name" {
  description = "Name of the API target group"
  value       = aws_lb_target_group.api.name
}

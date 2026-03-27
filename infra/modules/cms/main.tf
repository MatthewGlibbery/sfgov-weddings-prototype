terraform {
  required_providers {
    aws = {
      source                = "hashicorp/aws"
      version               = "~> 5.0"
      configuration_aliases = [aws.us-east-1]
    }
  }
}

# Data sources for auto-discovery
data "aws_vpc" "platform" {
  count = var.vpc_id == "" ? 1 : 0

  filter {
    name   = "tag:Name"
    values = ["platform_vpc"]
  }
}

data "aws_subnets" "loadbalancers" {
  count = length(var.subnets) == 0 ? 1 : 0

  filter {
    name   = "vpc-id"
    values = [local.vpc_id]
  }

  filter {
    name   = "tag:Availability"
    values = ["loadbalancers"]
  }
}

data "aws_security_group" "platform_training_postgres" {
  count = length(var.security_groups) == 0 ? 1 : 0

  filter {
    name   = "group-name"
    values = ["platform-training-postgres-sg"]
  }

  filter {
    name   = "vpc-id"
    values = [local.vpc_id]
  }
}

data "aws_security_group" "training_efs_ec2" {
  count = length(var.security_groups) == 0 ? 1 : 0

  filter {
    name   = "group-name"
    values = ["training-efs-ec2-sg"]
  }

  filter {
    name   = "vpc-id"
    values = [local.vpc_id]
  }
}

data "aws_security_group" "platform_training_alb_web" {
  count = length(var.security_groups) == 0 ? 1 : 0

  filter {
    name   = "group-name"
    values = ["platform-training-alb-web-sg"]
  }

  filter {
    name   = "vpc-id"
    values = [local.vpc_id]
  }
}

data "aws_security_group" "platform_training_elb_alb" {
  count = length(var.security_groups) == 0 ? 1 : 0

  filter {
    name   = "group-name"
    values = ["platform-training-elb-alb-sg"]
  }

  filter {
    name   = "vpc-id"
    values = [local.vpc_id]
  }
}

data "aws_security_group" "platform_cf_ec2_web" {
  count = length(var.alb_security_groups) == 0 ? 1 : 0

  filter {
    name   = "group-name"
    values = ["platform-cf-ec2-web"]
  }

  filter {
    name   = "vpc-id"
    values = [local.vpc_id]
  }
}

data "aws_security_group" "cms_cf_alb_web" {
  count = length(var.alb_security_groups) == 0 ? 1 : 0

  filter {
    name   = "group-name"
    values = ["cms-cf-alb-web-sg"]
  }

  filter {
    name   = "vpc-id"
    values = [local.vpc_id]
  }
}

data "aws_route53_zone" "dev_sf_gov" {
  count   = var.route53_zone_id == "" ? 1 : 0
  zone_id = "Z03635301IV76A90J88JQ"
}

data "aws_iam_role" "task_role" {
  count = var.task_role_arn == "" ? 1 : 0
  name  = "platform-ecsTaskRole"
}

data "aws_iam_role" "execution_role" {
  count = var.execution_role_arn == "" ? 1 : 0
  name  = "platform-ecsTaskExecutionRole"
}

data "aws_acm_certificate" "dev_sf_gov" {
  provider = aws.us-east-1
  count    = var.acm_certificate_arn == "" ? 1 : 0
  domain   = "*.dev.sf.gov"
  statuses = ["ISSUED"]
}

# Locals to choose between provided values and discovered values
locals {
  vpc_id = var.vpc_id != "" ? var.vpc_id : data.aws_vpc.platform[0].id

  subnets = length(var.subnets) > 0 ? var.subnets : data.aws_subnets.loadbalancers[0].ids

  security_groups = length(var.security_groups) > 0 ? var.security_groups : [
    data.aws_security_group.platform_training_postgres[0].id,
    data.aws_security_group.training_efs_ec2[0].id,
    data.aws_security_group.platform_training_alb_web[0].id,
    data.aws_security_group.platform_training_elb_alb[0].id,
  ]

  alb_security_groups = length(var.alb_security_groups) > 0 ? var.alb_security_groups : [
    data.aws_security_group.platform_cf_ec2_web[0].id,
    data.aws_security_group.cms_cf_alb_web[0].id,
  ]

  route53_zone_id = var.route53_zone_id != "" ? var.route53_zone_id : data.aws_route53_zone.dev_sf_gov[0].zone_id

  task_role_arn = var.task_role_arn != "" ? var.task_role_arn : data.aws_iam_role.task_role[0].arn

  execution_role_arn = var.execution_role_arn != "" ? var.execution_role_arn : data.aws_iam_role.execution_role[0].arn

  acm_certificate_arn = var.acm_certificate_arn != "" ? var.acm_certificate_arn : data.aws_acm_certificate.dev_sf_gov[0].arn

  web_container_image = var.web_container_image != "" ? var.web_container_image : "395833734759.dkr.ecr.us-west-1.amazonaws.com/platform/web:${var.environment}"

  api_container_image = var.api_container_image != "" ? var.api_container_image : "395833734759.dkr.ecr.us-west-1.amazonaws.com/platform/api:${var.environment}"

  web_host_header = var.web_host_header != "" ? var.web_host_header : regex("^https?://([^/]+)", var.web_base_url)[0]

  api_host_header = var.api_host_header != "" ? var.api_host_header : regex("^https?://([^/]+)", var.api_base_url)[0]
}


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

  container_image = var.container_image != "" ? var.container_image : "395833734759.dkr.ecr.us-west-1.amazonaws.com/platform/web:${var.environment}"
}

resource "aws_ecs_task_definition" "web" {
  family                   = "cms-${var.environment}-web"
  network_mode             = "awsvpc"
  requires_compatibilities = ["FARGATE"]
  cpu                      = var.task_cpu
  memory                   = var.task_memory
  task_role_arn            = local.task_role_arn
  execution_role_arn       = local.execution_role_arn

  runtime_platform {
    cpu_architecture        = "X86_64"
    operating_system_family = "LINUX"
  }

  container_definitions = jsonencode([
    {
      name      = "web"
      image     = local.container_image
      cpu       = 0
      essential = true
      portMappings = [
        {
          containerPort = 3000
          hostPort      = 3000
          protocol      = "tcp"
          name          = "web-3000-tcp"
          appProtocol   = "http"
        }
      ]
      environment = [
        {
          name  = "API_BASE_URL"
          value = var.api_base_url
        },
        {
          name  = "NODE_ENV"
          value = "production"
        },
        {
          name  = "NEXT_PUBLIC_CONTENT_API_BASE_URL"
          value = "${var.api_base_url}/api/v2"
        },
        {
          name  = "NEXT_PUBLIC_CONTENT_CMS_API_BASE_URL"
          value = "${var.api_base_url}/api/cms"
        }
      ]
      mountPoints  = []
      volumesFrom  = []
      linuxParameters = {
        initProcessEnabled = true
      }
      logConfiguration = {
        logDriver = "awslogs"
        options = {
          "awslogs-group"         = "cms-${var.environment}"
          "mode"                  = "non-blocking"
          "awslogs-create-group"  = "true"
          "max-buffer-size"       = "25m"
          "awslogs-region"        = "us-west-1"
          "awslogs-stream-prefix" = "web"
        }
      }
      healthCheck = {
        command = [
          "CMD-SHELL",
          "curl -f http://localhost:3000/health/ || exit 1"
        ]
        interval = 30
        timeout  = 5
        retries  = 3
      }
      systemControls = []
    }
  ])

  tags = merge(var.common_tags, {
    Name        = "cms-${var.environment}-web"
    Environment = var.environment
  })
}

resource "aws_lb_target_group" "web" {
  name        = "cms-${var.environment}-web-tg"
  port        = 3000
  protocol    = "HTTP"
  vpc_id      = local.vpc_id
  target_type = "ip"

  health_check {
    enabled             = true
    healthy_threshold   = 5
    unhealthy_threshold = 2
    timeout             = 5
    interval            = 30
    path                = "/health"
    protocol            = "HTTP"
    matcher             = "200"
  }

  tags = merge(var.common_tags, {
    Name        = "cms-${var.environment}-web-tg"
    Environment = var.environment
  })
}

resource "aws_ecs_service" "web" {
  name                              = "cms-${var.environment}-web"
  cluster                           = var.cluster_arn
  task_definition                   = aws_ecs_task_definition.web.arn
  desired_count                     = var.desired_count
  launch_type                       = "FARGATE"
  availability_zone_rebalancing     = "ENABLED"
  enable_ecs_managed_tags           = true
  enable_execute_command            = true
  health_check_grace_period_seconds = 0
  propagate_tags                    = "NONE"

  load_balancer {
    target_group_arn = aws_lb_target_group.web.arn
    container_name   = "web"
    container_port   = 3000
  }

  network_configuration {
    subnets          = local.subnets
    security_groups  = local.security_groups
    assign_public_ip = true
  }

  deployment_circuit_breaker {
    enable   = true
    rollback = true
  }

  deployment_controller {
    type = "ECS"
  }

  tags = merge(var.common_tags, {
    Name        = "cms-${var.environment}-web"
    Environment = var.environment
  })
}

resource "aws_lb_listener_rule" "web" {
  listener_arn = var.listener_arn
  priority     = var.listener_rule_priority

  action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.web.arn
  }

  condition {
    host_header {
      values = [var.host_header]
    }
  }

  tags = merge(var.common_tags, {
    Name        = "cms-${var.environment}-web-rule"
    Environment = var.environment
  })
}

resource "aws_wafv2_web_acl" "web" {
  provider = aws.us-east-1
  name     = "cms-${var.environment}-web-acl"
  scope    = "CLOUDFRONT"

  default_action {
    allow {}
  }

  rule {
    name     = "AWS-AWSManagedRulesAmazonIpReputationList"
    priority = 0

    override_action {
      count {}
    }

    statement {
      managed_rule_group_statement {
        vendor_name = "AWS"
        name        = "AWSManagedRulesAmazonIpReputationList"
      }
    }

    visibility_config {
      cloudwatch_metrics_enabled = true
      metric_name                = "AWS-AWSManagedRulesAmazonIpReputationList"
      sampled_requests_enabled   = true
    }
  }

  rule {
    name     = "AWS-AWSManagedRulesAnonymousIpList"
    priority = 1

    override_action {
      count {}
    }

    statement {
      managed_rule_group_statement {
        vendor_name = "AWS"
        name        = "AWSManagedRulesAnonymousIpList"
      }
    }

    visibility_config {
      cloudwatch_metrics_enabled = true
      metric_name                = "AWS-AWSManagedRulesAnonymousIpList"
      sampled_requests_enabled   = true
    }
  }

  rule {
    name     = "AWS-AWSManagedRulesBotControlRuleSet"
    priority = 2

    override_action {
      count {}
    }

    statement {
      managed_rule_group_statement {
        vendor_name = "AWS"
        name        = "AWSManagedRulesBotControlRuleSet"
      }
    }

    visibility_config {
      cloudwatch_metrics_enabled = true
      metric_name                = "AWS-AWSManagedRulesBotControlRuleSet"
      sampled_requests_enabled   = true
    }
  }

  rule {
    name     = "AWS-AWSManagedRulesLinuxRuleSet"
    priority = 3

    override_action {
      none {}
    }

    statement {
      managed_rule_group_statement {
        vendor_name = "AWS"
        name        = "AWSManagedRulesLinuxRuleSet"
      }
    }

    visibility_config {
      cloudwatch_metrics_enabled = true
      metric_name                = "AWS-AWSManagedRulesLinuxRuleSet"
      sampled_requests_enabled   = true
    }
  }

  rule {
    name     = "AWS-AWSManagedRulesCommonRuleSet"
    priority = 4

    override_action {
      count {}
    }

    statement {
      managed_rule_group_statement {
        vendor_name = "AWS"
        name        = "AWSManagedRulesCommonRuleSet"
      }
    }

    visibility_config {
      cloudwatch_metrics_enabled = true
      metric_name                = "AWS-AWSManagedRulesCommonRuleSet"
      sampled_requests_enabled   = true
    }
  }

  rule {
    name     = "RateLimit-Default"
    priority = 5

    action {
      challenge {}
    }

    statement {
      rate_based_statement {
        limit              = 550
        aggregate_key_type = "IP"
      }
    }

    visibility_config {
      cloudwatch_metrics_enabled = true
      metric_name                = "RateLimit-Default"
      sampled_requests_enabled   = true
    }
  }

  visibility_config {
    cloudwatch_metrics_enabled = true
    metric_name                = "cms-${var.environment}-web-acl"
    sampled_requests_enabled   = false
  }

  tags = merge(var.common_tags, {
    Name        = "cms-${var.environment}-web-acl"
    Environment = var.environment
  })
}

resource "aws_cloudfront_distribution" "web" {
  enabled         = true
  is_ipv6_enabled = false
  comment         = var.host_header
  price_class     = "PriceClass_100"
  http_version    = "http2"
  web_acl_id      = aws_wafv2_web_acl.web.arn

  aliases = [var.host_header]

  origin {
    domain_name         = var.alb_dns_name
    origin_id           = var.host_header
    connection_attempts = 3
    connection_timeout  = 10

    custom_origin_config {
      http_port                = 3000
      https_port               = 443
      origin_protocol_policy   = "http-only"
      origin_ssl_protocols     = ["TLSv1.2"]
      origin_read_timeout      = 30
      origin_keepalive_timeout = 5
    }
  }

  default_cache_behavior {
    allowed_methods        = ["DELETE", "GET", "HEAD", "OPTIONS", "PATCH", "POST", "PUT"]
    cached_methods         = ["GET", "HEAD"]
    target_origin_id       = var.host_header
    compress               = true
    viewer_protocol_policy = "redirect-to-https"

    forwarded_values {
      query_string = true
      headers      = ["Host"]
      cookies {
        forward = "none"
      }
    }

    min_ttl     = 0
    default_ttl = 86400
    max_ttl     = 31536000
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  viewer_certificate {
    acm_certificate_arn      = local.acm_certificate_arn
    ssl_support_method       = "sni-only"
    minimum_protocol_version = "TLSv1.2_2021"
  }

  tags = merge(var.common_tags, {
    Name        = "cms-${var.environment}-web"
    Environment = var.environment
  })
}

resource "aws_route53_record" "web" {
  zone_id = local.route53_zone_id
  name    = var.host_header
  type    = "A"

  alias {
    name                   = aws_cloudfront_distribution.web.domain_name
    zone_id                = aws_cloudfront_distribution.web.hosted_zone_id
    evaluate_target_health = false
  }
}

resource "aws_ecs_task_definition" "web" {
  family                   = "cms-${var.environment}-web"
  network_mode             = "awsvpc"
  requires_compatibilities = ["FARGATE"]
  cpu                      = var.web_task_cpu
  memory                   = var.web_task_memory
  task_role_arn            = local.task_role_arn
  execution_role_arn       = local.execution_role_arn

  runtime_platform {
    cpu_architecture        = "X86_64"
    operating_system_family = "LINUX"
  }

  container_definitions = jsonencode([
    {
      name      = "web"
      image     = local.web_container_image
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
  desired_count                     = var.web_desired_count
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
  priority     = var.web_listener_rule_priority

  action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.web.arn
  }

  condition {
    host_header {
      values = [local.web_host_header]
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
  comment         = local.web_host_header
  price_class     = "PriceClass_100"
  http_version    = "http2"
  web_acl_id      = aws_wafv2_web_acl.web.arn

  aliases = [local.web_host_header]

  origin {
    domain_name         = var.alb_dns_name
    origin_id           = local.web_host_header
    connection_attempts = 3
    connection_timeout  = 10

    custom_origin_config {
      http_port                = 80
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
    target_origin_id       = local.web_host_header
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
  name    = local.web_host_header
  type    = "A"

  alias {
    name                   = aws_cloudfront_distribution.web.domain_name
    zone_id                = aws_cloudfront_distribution.web.hosted_zone_id
    evaluate_target_health = false
  }
}


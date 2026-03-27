resource "aws_ecs_task_definition" "api" {
  family                   = "cms-${var.environment}-api"
  network_mode             = "awsvpc"
  requires_compatibilities = ["FARGATE"]
  cpu                      = var.api_task_cpu
  memory                   = var.api_task_memory
  task_role_arn            = local.task_role_arn
  execution_role_arn       = local.execution_role_arn

  runtime_platform {
    cpu_architecture        = "X86_64"
    operating_system_family = "LINUX"
  }

  container_definitions = jsonencode([
    {
      name      = "api"
      image     = local.api_container_image
      cpu       = 0
      essential = true
      portMappings = [
        {
          containerPort = 80
          hostPort      = 80
          protocol      = "tcp"
          name          = "api-80-tcp"
          appProtocol   = "http"
        }
      ]
      secrets = [
        {
          name      = "DB_USERNAME"
          valueFrom = "${var.api_secrets_arn}:DB_USERNAME::"
        },
        {
          name      = "DB_PASSWORD"
          valueFrom = "${var.api_secrets_arn}:DB_PASSWORD::"
        }
      ]
      environment = [
        {
          name  = "AWS_REGION"
          value = "us-west-1"
        },
        {
          name  = "DJANGO_SETTINGS_MODULE"
          value = "config.settings.combined"
        },
        {
          name  = "ALLOWED_HOSTS"
          value = local.api_host_header
        },
        {
          name  = "DB_HOST"
          value = var.api_db_host
        },
        {
          name  = "DB_NAME"
          value = var.api_db_name
        },
        {
          name  = "DB_PORT"
          value = var.api_db_port
        },
        {
          name  = "HEADLESS_BASE_URL"
          value = var.web_base_url
        },
        {
          name  = "BASE_URL"
          value = var.api_base_url
        },
        {
          name  = "CSRF_TRUSTED_ORIGINS"
          value = "${var.api_base_url}"
        },
        {
          name  = "CSRF_COOKIE_DOMAIN"
          value = ".dev.sf.gov"
        },
        {
          name  = "DOMAIN"
          value = local.web_host_header
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
          "awslogs-stream-prefix" = "api"
        }
      }
      healthCheck = {
        command = [
          "CMD-SHELL",
          "curl -f http://localhost:80/health || exit 1"
        ]
        interval = 30
        timeout  = 5
        retries  = 3
      }
      systemControls = []
    }
  ])

  tags = merge(var.common_tags, {
    Name        = "cms-${var.environment}-api"
    Environment = var.environment
  })
}

resource "aws_lb_target_group" "api" {
  name        = "cms-${var.environment}-api-tg"
  port        = 80
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
    Name        = "cms-${var.environment}-api-tg"
    Environment = var.environment
  })
}

resource "aws_ecs_service" "api" {
  name                              = "cms-${var.environment}-api"
  cluster                           = var.cluster_arn
  task_definition                   = aws_ecs_task_definition.api.arn
  desired_count                     = var.api_desired_count
  launch_type                       = "FARGATE"
  availability_zone_rebalancing     = "ENABLED"
  enable_ecs_managed_tags           = true
  enable_execute_command            = true
  health_check_grace_period_seconds = 0
  propagate_tags                    = "NONE"

  load_balancer {
    target_group_arn = aws_lb_target_group.api.arn
    container_name   = "api"
    container_port   = 80
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
    Name        = "cms-${var.environment}-api"
    Environment = var.environment
  })
}

resource "aws_lb_listener_rule" "api" {
  listener_arn = var.listener_arn
  priority     = var.api_listener_rule_priority

  action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.api.arn
  }

  condition {
    host_header {
      values = [local.api_host_header]
    }
  }

  tags = merge(var.common_tags, {
    Name        = "cms-${var.environment}-api-rule"
    Environment = var.environment
  })
}

resource "aws_wafv2_web_acl" "api" {
  provider = aws.us-east-1
  name     = "cms-${var.environment}-api-acl"
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
    name     = "AWS-AWSManagedRulesCommonRuleSet"
    priority = 1

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
    name     = "RateLimit-API"
    priority = 2

    action {
      challenge {}
    }

    statement {
      rate_based_statement {
        limit              = 1000
        aggregate_key_type = "IP"
      }
    }

    visibility_config {
      cloudwatch_metrics_enabled = true
      metric_name                = "RateLimit-API"
      sampled_requests_enabled   = true
    }
  }

  visibility_config {
    cloudwatch_metrics_enabled = true
    metric_name                = "cms-${var.environment}-api-acl"
    sampled_requests_enabled   = false
  }

  tags = merge(var.common_tags, {
    Name        = "cms-${var.environment}-api-acl"
    Environment = var.environment
  })
}

# CloudFront distribution for API
# Uses AWS managed cache policy: UseOriginCacheControlHeaders-QueryStrings (4cc15a8a-d715-48a4-82b8-cc0b614638fe)
# This policy forwards: origin, host, x-method-override, x-http-method, x-http-method-override headers (lowercase)
# and all cookies/query strings, with TTL controlled by origin Cache-Control headers
resource "aws_cloudfront_distribution" "api" {
  enabled         = true
  is_ipv6_enabled = true
  comment         = local.api_host_header
  price_class     = "PriceClass_All"
  http_version    = "http2"
  web_acl_id      = aws_wafv2_web_acl.api.arn

  aliases = [local.api_host_header]

  origin {
    domain_name         = var.alb_dns_name
    origin_id           = local.api_host_header
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
    target_origin_id       = local.api_host_header
    compress               = true
    viewer_protocol_policy = "redirect-to-https"
    cache_policy_id        = "4cc15a8a-d715-48a4-82b8-cc0b614638fe"
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
    Name        = "cms-${var.environment}-api"
    Environment = var.environment
  })
}

resource "aws_route53_record" "api" {
  zone_id = local.route53_zone_id
  name    = local.api_host_header
  type    = "A"

  alias {
    name                   = aws_cloudfront_distribution.api.domain_name
    zone_id                = aws_cloudfront_distribution.api.hosted_zone_id
    evaluate_target_health = false
  }
}

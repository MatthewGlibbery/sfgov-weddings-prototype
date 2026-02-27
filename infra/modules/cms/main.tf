resource "aws_ecs_task_definition" "web" {
  family                   = "cms-${var.environment}-web"
  network_mode             = "awsvpc"
  requires_compatibilities = ["FARGATE"]
  cpu                      = var.task_cpu
  memory                   = var.task_memory
  task_role_arn            = var.task_role_arn
  execution_role_arn       = var.execution_role_arn

  runtime_platform {
    cpu_architecture        = "X86_64"
    operating_system_family = "LINUX"
  }

  container_definitions = jsonencode([
    {
      name      = "web"
      image     = var.container_image
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
  vpc_id      = var.vpc_id
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
    subnets          = var.subnets
    security_groups  = var.security_groups
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

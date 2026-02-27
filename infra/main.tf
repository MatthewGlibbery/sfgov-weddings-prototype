terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = "us-west-1"
}

locals {
  common_tags = {
    ProductTeam = "cms"
    ManagedBy   = "terraform"
    Repository  = "cms-next"
  }
}

module "cms_training" {
  source = "./modules/cms"

  environment = "training"
  vpc_id      = "vpc-0be74497dcddf02a8"
  subnets     = ["subnet-0e8ca1ae723d17550", "subnet-0af5858b570b99beb"]
  security_groups = [
    "sg-02fbfdbc5fefd15bc",
    "sg-0562ac57bdd3033e9",
    "sg-09221bce156c0d41c",
    "sg-0ceed8e286cee7217"
  ]
  alb_security_groups      = ["sg-0ea54c21fd6940771", "sg-0abc71626ad3557d7"]
  cluster_arn              = "arn:aws:ecs:us-west-1:395833734759:cluster/cms-common"
  task_role_arn            = "arn:aws:iam::395833734759:role/platform-ecsTaskRole"
  execution_role_arn       = "arn:aws:iam::395833734759:role/platform-ecsTaskExecutionRole"
  container_image          = "395833734759.dkr.ecr.us-west-1.amazonaws.com/platform/web:training"
  api_base_url             = "https://api-training.dev.sf.gov"
  listener_arn             = "arn:aws:elasticloadbalancing:us-west-1:395833734759:listener/app/cms-common/b8f665a290342dce/ea41240ac8c9d2f3"
  listener_rule_priority   = 10
  host_header              = "web-training-ecs.dev.sf.gov"

  task_cpu      = "1024"
  task_memory   = "2048"
  desired_count = 1

  common_tags = local.common_tags
}

resource "aws_lb" "cms_common" {
  name               = "cms-common"
  internal           = false
  load_balancer_type = "application"
  security_groups    = ["sg-0ea54c21fd6940771", "sg-0abc71626ad3557d7"]
  subnets            = ["subnet-0e8ca1ae723d17550", "subnet-0af5858b570b99beb"]

  ip_address_type = "ipv4"

  access_logs {
    enabled = true
    bucket  = "aws-control-tower-elb-local-logs-395833734759-us-west-1"
    prefix  = "cms-common"
  }

  tags = merge(local.common_tags, {
    Name = "cms-common"
  })
}

resource "aws_cloudfront_distribution" "training_web" {
  enabled         = true
  is_ipv6_enabled = false
  comment         = "web-training-ecs.dev.sf.gov"
  price_class     = "PriceClass_100"
  http_version    = "http2"
  web_acl_id      = "arn:aws:wafv2:us-east-1:395833734759:global/webacl/platform_training_web_acl/de51777e-ec52-4274-baf1-ff267a45c357"

  aliases = ["web-training-ecs.dev.sf.gov"]

  origin {
    domain_name         = aws_lb.cms_common.dns_name
    origin_id           = "web-training-ecs.dev.sf.gov"
    connection_attempts = 3
    connection_timeout  = 10

    custom_origin_config {
      http_port                = 3000
      https_port               = 443
      origin_protocol_policy   = "http-only"
      origin_ssl_protocols     = ["TLSv1", "TLSv1.1", "TLSv1.2"]
      origin_read_timeout      = 30
      origin_keepalive_timeout = 5
    }
  }

  default_cache_behavior {
    allowed_methods        = ["DELETE", "GET", "HEAD", "OPTIONS", "PATCH", "POST", "PUT"]
    cached_methods         = ["GET", "HEAD"]
    target_origin_id       = "web-training-ecs.dev.sf.gov"
    compress               = true
    viewer_protocol_policy = "redirect-to-https"

    forwarded_values {
      query_string = true
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
    acm_certificate_arn      = "arn:aws:acm:us-east-1:395833734759:certificate/2bb3aa92-8616-4dd7-98cb-f3de697da8a4"
    ssl_support_method       = "sni-only"
    minimum_protocol_version = "TLSv1.1_2016"
  }

  tags = merge(local.common_tags, {
    Name = "web-training-ecs"
  })
}

resource "aws_route53_record" "training_web" {
  zone_id = "Z03635301IV76A90J88JQ"
  name    = "web-training-ecs.dev.sf.gov"
  type    = "A"

  alias {
    name                   = aws_cloudfront_distribution.training_web.domain_name
    zone_id                = aws_cloudfront_distribution.training_web.hosted_zone_id
    evaluate_target_health = false
  }
}

This is the infra folder for the CMS frontend.

 - route 53
 - cloudfront
 - alb (existing)
    - listener
    - target group
        - ecs task/service
 - ecs cluster (existing)
    - ecs task def
    - ecs cluster
    - service
        - vpc (existing)
        - security group(s) (existing)
        - subnets (existing)
    - task

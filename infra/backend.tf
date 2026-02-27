terraform {
  backend "s3" {
    bucket = "sfds-tfstate"
    key    = "sfgov-next/terraform.tfstate"
    region = "us-west-1"
  }
}

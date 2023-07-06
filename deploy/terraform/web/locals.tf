locals {
  common_tags = {
    deployment-version = join("", [terraform.workspace, timestamp()])
  }
}

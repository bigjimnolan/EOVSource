resource "aws_instance" "tfer--i-0ae050d276fff73a6_" {
  ami                         = "ami-024e6efaf93d85776"
  associate_public_ip_address = "true"
  availability_zone           = "us-east-2b"

  capacity_reservation_specification {
    capacity_reservation_preference = "open"
  }

  credit_specification {
    cpu_credits = "standard"
  }

  disable_api_stop        = "false"
  disable_api_termination = "false"
  ebs_optimized           = "false"

  enclave_options {
    enabled = "false"
  }

  get_password_data                    = "false"
  hibernation                          = "false"
  instance_initiated_shutdown_behavior = "stop"
  instance_type                        = "t2.micro"
  ipv6_address_count                   = "0"
  key_name                             = "TFAuto"

  maintenance_options {
    auto_recovery = "default"
  }

  metadata_options {
    http_endpoint               = "enabled"
    http_put_response_hop_limit = "1"
    http_tokens                 = "optional"
    instance_metadata_tags      = "disabled"
  }

  monitoring                 = "false"
  placement_partition_number = "0"

  private_dns_name_options {
    enable_resource_name_dns_a_record    = "true"
    enable_resource_name_dns_aaaa_record = "false"
    hostname_type                        = "ip-name"
  }

  private_ip = "172.31.22.234"

  root_block_device {
    delete_on_termination = "true"
    encrypted             = "false"
    volume_size           = "8"
    volume_type           = "gp2"
  }

  ##  security_groups        = ["launch-wizard-1"]
  ##  source_dest_check      = "true"
  ##  subnet_id              = "subnet-9fdf2be5"
  ##  tenancy                = "default"
  ##  vpc_security_group_ids = ["sg-0f038c167b7b5a165"]
}

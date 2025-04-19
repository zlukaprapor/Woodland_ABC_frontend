provider "aws" {
  region = "us-east-1"
}

resource "aws_instance" "my_instance" {
  ami           = "ami-0c55b159cbfafe1f0"  # Виберіть ваш образ
  instance_type = "t2.micro"

  tags = {
    Name = "my-instance"
  }
}

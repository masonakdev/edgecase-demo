#!/usr/bin/env bash
set -euo pipefail

# Change in production
export AWS_ACCESS_KEY_ID=your-access-key-id
export AWS_SECRET_ACCESS_KEY=your-secret-access-key

export AWS_DEFAULT_REGION=us-east-1
export ECR_REGISTRY=public.ecr.aws/u8u9n1r7
export ECR_REPO=edgecase-demo

aws ecr-public get-login-password --region $AWS_DEFAULT_REGION | docker login --username AWS --password-stdin $ECR_REGISTRY

cd /opt/edgecase

docker compose -f docker-compose.prod.yml up -d
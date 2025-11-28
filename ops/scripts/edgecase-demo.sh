#!/usr/bin/env bash
set -euo pipefail

cd /home/ubuntu/edgecase-demo

aws ecr-public get-login-password --region us-east-1 | docker login --username AWS --password-stdin public.ecr.aws

docker compose -f docker-compose.prod.yml --env-file /home/ubuntu/edgecase-demo/.env up -d

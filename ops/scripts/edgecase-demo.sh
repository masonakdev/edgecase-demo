#!/usr/bin/env bash
set -euo pipefail

cd $HOME/edgecase-demo

docker compose -f docker-compose.prod.yml --env-file $HOME/edgecase-demo/.env up -d

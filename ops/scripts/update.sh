#!/bin/bash
sudo systemctl stop edgecase-demo
sudo systemctl disable edgecase-demo
sudo cp $HOME/edgecase-demo/ops/systemd/edgecase-demo.service /etc/systemd/system/
sudo systemctl daemon-reload
sudo systemctl enable edgecase-demo
sudo systemctl start edgecase-demo

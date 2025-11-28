#!/bin/bash
systemctl stop edgecase-demo
systemctl disable edgecase-demo
cp $HOME/edgecase-demo/ops/systemd/edgecase-demo.service /etc/systemd/system/
systemctl daemon-reload
systemctl enable edgecase-demo
systemctl start edgecase-demo

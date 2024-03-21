#!/bin/bash

sudo apt-get update
sudo apt-get install certbot python3-certbot-nginx

sudo certbot --nginx -d j10c107.p.ssafy.io

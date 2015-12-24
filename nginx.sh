#!/bin/bash

# include bash base
. _base.sh

# Create all needed directories!
./directories.sh

# Create SSL certs
./ssl.sh

sudo cp /var/www/FreakXoHBingo/server/nginx.conf /etc/nginx/sites-available/freakxohbingo.conf
echo "${underline}${green}The Web-Server configuration copied to target location${reset}"
sudo ln -s /etc/nginx/sites-available/freakxohbingo.conf /etc/nginx/sites-enabled/freakxohbingo.conf
echo "${underline}${green}The Web-Server configuration enabled${reset}"
sudo /etc/init.d/php7.0-fpm restart
sudo /etc/init.d/nginx restart
echo "${underline}${green}The Web-Server restarted${reset}"

#!/bin/bash

# include bash base
. _base.sh

# Create all needed directories!
./directories.sh

# Create SSL certs
./ssl.sh

if sudo test -f "/etc/letsencrypt/live/freakxohbingo.de/cert.pem"
then
    sudo cp /var/www/FreakXoHBingo/server/nginx-letsencrypt.conf /etc/nginx/sites-available/freakxohbingo.conf
    echo "${underline}${green}The Web-Server configuration with Let’s Encrypt copied to target location${reset}"
else
    sudo cp /var/www/FreakXoHBingo/server/nginx.conf /etc/nginx/sites-available/freakxohbingo.conf
    echo "${underline}${green}The Web-Server configuration copied to target location${reset}"
fi

sudo ln -s /etc/nginx/sites-available/freakxohbingo.conf /etc/nginx/sites-enabled/freakxohbingo.conf
echo "${underline}${green}The Web-Server configuration enabled${reset}"

sudo /etc/init.d/php7.0-fpm restart
sudo /etc/init.d/nginx restart
echo "${underline}${green}The Web-Server restarted${reset}"

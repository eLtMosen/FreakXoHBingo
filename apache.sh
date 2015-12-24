#!/bin/bash

# include bash base
. _base.sh

# Create all needed directories!
./directories.sh

# Create SSL certs
./ssl.sh

sudo cp /var/www/FreakXoHBingo/server/apache.conf /etc/apache2/sites-available/freakxohbingo.conf
sudo cp /var/www/FreakXoHBingo/server/apache-include.conf /etc/apache2/sites-available/freakxohbingo-include.conf
echo "${underline}${green}The Web-Server configuration copied to target location${reset}"
sudo a2ensite freakxohbingo.conf
echo "${underline}${green}The Web-Server configuration enabled${reset}"
sudo /etc/init.d/apache2 restart
echo "${underline}${green}The Web-Server restarted${reset}"

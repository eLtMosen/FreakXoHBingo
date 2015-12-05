#!/bin/bash

# include bash base
. _base.sh

cp /var/www/supr-reports/apache/supr-reports.conf /etc/apache2/sites-available/supr-reports.conf
echo "${underline}${green}The Web-Server configuration copied to target location${reset}"
a2ensite supr-reports.conf
echo "${underline}${green}The Web-Server configuration enabled${reset}"
sudo /etc/init.d/apache2 restart
echo "${underline}${green}The Web-Server restarted${reset}"

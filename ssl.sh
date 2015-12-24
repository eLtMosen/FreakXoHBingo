#!/bin/bash

# include bash base
. _base.sh

# Create all needed directories!
./directories.sh

# SSL Zertifikat erzeugen
# Besonderheit: das Zertifikat signieren wir selbst und es wird ohne Passphrase erzeugt!
# Achtung! Das sollte nur für die Entwicklungsumgebung verwendet werden. Auf Live Servern bitte NICHT!
# Gefunden auf: http://blog.justin.kelly.org.au/how-to-create-a-self-sign-ssl-cert-with-no-pa/
if [ ! -f /etc/ssl/private/freakxohbingo.de.key ]
then
    sudo openssl genrsa -out /etc/ssl/private/freakxohbingo.key 1024
    sudo openssl req -new -key /etc/ssl/private/freakxohbingo.key -out /etc/ssl/private/freakxohbingo.csr -config ./server/openssl.cnf
    #sudo openssl req -new -x509 -extensions v3_ca -keyout /etc/ssl/private/freakxohbingo.key -out /etc/ssl/certs/freakxohbingo.pem -days 3650 -config ./server/openssl.cnf
    sudo openssl x509 -req -days 1098 -in /etc/ssl/private/freakxohbingo.csr -signkey /etc/ssl/private/freakxohbingo.key -out /etc/ssl/private/freakxohbingo.crt

    sudo chmod 660 /etc/ssl/private/freakxohbingo.crt
    sudo chmod 660 /etc/ssl/private/freakxohbingo.csr
    sudo chmod 660 /etc/ssl/private/freakxohbingo.key

    echo "${underline}${green}The SSL Cert for the Web-Server created!${reset}"
fi

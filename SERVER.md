# Server Installation

Diese Anleitung geht davon aus, dass auf dem Server Ubuntu (ggf. Debian - nicht getestet) installiert ist.

Ziel ist es das Projekt auf PHP 7 luafen zu lassen. Als Web-Server kann Nginx oder Apache verwendet werden. Als Datenbank wird MySQL 5.6 installiert.

Umgebung vorbereiten:

    sudo apt-get install git git-flow
    sudo apt-get install software-properties-common python-software-properties

_**Optional:** Kleine aber sehr nützliche Anpassungen an der Shell:_

    sudo apt-get install curl zsh
    curl -L https://github.com/robbyrussell/oh-my-zsh/raw/master/tools/install.sh | sh
    
Solle bei der Installation ein Fehler auftreten, dann hilft meistens:

    chsh -s `which zsh` && /usr/bin/env zsh && . ~/.zshrc

## PHP 7 installieren

Zur Zeit (Stand 24.12.2015) ist PHP 7 noch zu neu und in den Distributionen nicht vorhanden. Hier also eine Anleitung wie man es installieren kann.

    sudo add-apt-repository ppa:ondrej/php-7.0
    sudo apt-get update
    sudo apt-get install php7.0-fpm php7.0-mysql php7.0-curl php7.0-json

_**Note:** If your system's locale is set to anything other than UTF-8, adding the PPA may fail due to a bug handling characters in the author's name. As a workaround, you can install language-pack-en-base to make sure that locales are generated, and override system-wide locale settings while adding the PPA:_

    sudo apt-get install -y language-pack-en-base
    sudo LC_ALL=en_US.UTF-8 add-apt-repository ppa:ondrej/php-7.0

## NGINX

Aus performance Gründen ist es optimal Nginx als Web-Server zu installieren:

    sudo apt-get install nginx

Anpassungen der Konfiguration durch Löschen der **default** Konfiguration:

    sudo rm /etc/nginx/sites-enabled/default 

_Für den Einsatz von Nginx kann die Host Konfiguration mit dem Script  ```./nginx.sh``` erstellt werden._


## Apache

Die gängigere Installation ist Apache als Web-Server:

    sudo apt-get install apache2 libapache2-mod-php7.0

_Für den Einsatz von Apache kann die Host Konfiguration mit dem Script  ```./apache.sh``` erstellt werden._

## MySQL

Als Datenbank kommt MySQL zum Einsatz. Die aktuelle Version, die mit den Distributionen ausgeliefert wird, ist 5.6: 

    sudo apt-get install mysql-server

_Hinweis: Falls die Distribution älter ist, dann wird auch eine ältere MySSQL Version instelliert. Um auf Version 5.6 zu kommen folgende Commands verwenden:_

    sudo add-apt-repository -y ppa:ondrej/mysql-5.6
    sudo apt-get update
    sudo apt-get install mysql-server-5.6

Einen Benutzer und eine entsprechende Datenbank erstellen:

    mysql -uroot -p
    CREATE DATABASE bingo;
    CREATE USER 'bingo'@'127.0.0.1' IDENTIFIED BY 'qwer1234';
    GRANT ALL PRIVILEGES ON *.* TO 'bingo'@'127.0.0.1'; 

# Installation

Bevor das Projekt installiert werden kann sollte der Server vorbereit werden. Siehe hierzu: [Server Installation](SERVER.md)

_**Hinweis:** In dieser Anleitung gehen wir davon aus, dass das Projekt unter ```/var/www``` installiert wird. Zu diesem Zweck vorher zum www-data User werden:_

    su - www-data

Wenn kein Login als www-data erlaubt ist, dann:

    su -s /bin/bash www-data
    
Projekt auschecken und installieren:

    cd /var/www
    git clone git@github.com:adamibrom/FreakXoHBingo.git
    cd FreakXoHBingo
    ./composer.sh i

Von Symfony wird ein Dialog gestartet in dem dann die bei der [Server Installation](SERVER.md) (Datenbank User und Password) eingegebene Daten eingetragen werden.

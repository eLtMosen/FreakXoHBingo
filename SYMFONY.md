# Symfony 2

Das Frontend (die Spiele), der Adminbereich werden von Symfony erzeugt. Das Backend des Spiele wird über eine REST API angesprochen.

## Installation

Im ersten Schritt der Projekt klonen:

    cd /var/www
    git clone git@github.com:bassix/FreakXoHBingo.git
    cd FreakXoHBingo

Ist der Code von Github lokal verfügbar, das Installationsscript Ausführen um die Composer Pakete zu installieren:

    ./composer.sh i

Von Symfony wird ein Dialog gestartet in dem dann die bei der [Server Installation](SERVER.md) (Datenbank User und Password) eingegebene Daten eingetragen werden.

_**Hinweis:** Ist bei der Konfiguration etwas schief gelaufen, dann kann die Installation auch manuel erstellt werden. Hier zu die ```app/config/parameters.yml.dist``` in  ```app/config/parameters.yml``` kopieren und bearbeiten._

    cp app/config/parameters.yml.dist app/config/parameters.yml
    nano app/config/parameters.yml

### Grundstruktur

Alle Routen werden über annotations (**```@Route```** und **```@Method```**) konfiguriert. Die Route ist somit im Doc-Block der Controller-Methode definiert.

### Externe Bundles

Die wichtisten Pakete in einer kurzen Übersicht:

* **PHPUnit** in der 5er Version zum Ausführen von Tests.
* **[Symfony 2.7](https://symfony.com/)** als Framework zum erzeugen von Seiten.
* **[Propel 2](http://propelorm.org/)** als Datenbankabstraktionsschicht und für die Schema Versionierung.
* **FOS Rest** ein Bundle, das eine Rest Full API erzeugt.

*Unter **[Erstinstallation](#erstinstallation)** ist beschrieben wie das Projekt aufgesetzt wurde,

## Arbeiten mit Symfony

Die wichtigsten Kommandos für das Arbeiten mit Symfony:

Die Assets für die Live-Umgebung aufbauen:

    app/console assetic:dump --env=prod

Die Assets für die Entwicklungs-Umgebung aufbauen:

    app/console assets:install --env=dev --symlink

Den Produktions-Cache neu aufbauen:

    app/console cache:clear --env=prod --no-debug

Den Cache für die Entwicklungs-Umgebung aufbauen:

    app/console cache:clear --env=dev

## Propel

[Propel](http://propelorm.org/) ist eine Datenbank Abstractions Schicht (ORM) zum Beschleunigen der Entwicklung von Lese und Schreibzugriffen auf die Datenbank.

* Konfiguriert wird Propel über die ```app/config/propel.yml```
* Im Bundle liegt eine Schema-Beschreibung der Tabellen: ```src/BingoBundle/Resources/config/propel/schema.xml```
* Mit Propel werden Basis Models und Klassen mit Methoden zum Handhaben von Daten mit ```app/console propel:build```
* Der Generierte Code wird abgelegt in: ```src/BingoBundle/Propel```

Die wichtigsten Kommandos:

* ```app/console propel:database:create``` Erstellen der Datenbank (Vorausgesetzt, der User hat die nötigen Rechte ;) ).
* ```app/console propel:build``` Bauen des SQL Schema und der Propel Klassen. Alternative ```app/console propel:sql:build``` um das SQL zu erzeugen und ```app/console propel:model:build``` Model Klassen zu generieren.
* ```app/console propel:sql:insert``` Das erzeuge Tabellen Schema SQL in die Datenbank schreiben.

Anpassungen im Scheme und Migrationen:

* ```app/console propel:migration:status``` Den Status der Migrations abfragen.
* ```app/console propel:migration:up``` Die Aufwerts Migration ausführen.
* ```app/console propel:migration:down``` Migrationen zurücknehmen.
* ```app/console propel:migration:diff``` **Wichtig!** Wird das Schema angepasst, dann muss ein Migrationsscript erzeugt werden, damit die Tabellen auf das neue Schmea migriert werden können. **Achtung!** Das Script hat so seine Probleme mit Groß- und Kleinschreibung! Daher immer vor dem Commiten des Migrationsscript dieses vorher prüfen! _Speicherort: ```app/propel/migrations```_

**Achtung!** Workaround auf Grund eines Bugs: ```app/console propel:build``` klappt nicht, wenn ```app/propel/sql/sqldb.map``` bereits exitiert!

    rm app/propel/sql/sqldb.map
    app/console propel:build

Wenn der Bug behoben ist, dann sollte ```app/console propel:build --overwrite``` klappen.

___

# Dokumentation

Einige Befehle werden nur einmal beim ersten Aufsetzen eines Projekts ausgeführt. Hier also nur zu Dokummentationszwecken ;) 

## <a name="erstinstallation"></a>Erstinstallation

Open your command console and execute the following commands:

```
sudo curl -LsS http://symfony.com/installer -o /usr/local/bin/symfony
sudo chmod a+x /usr/local/bin/symfony
```

Projekt mit Symfony erstellen:

```
symfony new reporting 2.7
```

Unsere Variante, Projekt mit Composer erstellen:

```
./composer.phar create-project symfony/framework-standard-edition reporting "2.7.*" 
```

Nach dem das Projekt erstellt wurde kann es konfiguriert werden.

## Neues Bundle erstellen

Es gibt mehrere Bundles, die bnötigt werden und die ersteinmal angelegt werden müssen:

* **BaseBundle** 
    app/console generate:bundle --namespace=BaseBundle
* **BingoBundle**
    app/console generate:bundle --namespace=BingoBundle

Anschließend stehen die Bundles zur Verfügung.

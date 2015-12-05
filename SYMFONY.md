# Symfony 2

Das Frontend (die Spiele), der Adminbereich werden von Symfony erzeugt. Das Backend des Spiele wird über eine REST API angesprochen.

## Installation

Im ersten Schritt der Projekt klonen:

Anschliessend die Konfiguration erstellen. Hier zu die ```app/config/parameters.yml.dist``` in  ```app/config/parameters.yml``` kopieren.

    cp app/config/parameters.yml.dist app/config/parameters.yml

Die Datenbank und der Mail Server sollten entsprechend konfiguriert werden.

Ist die Konfiguration abgeschlossen, dass die Composer Pakete installieren:

    ./composer.sh i

Die wichtisten Pakete:

* **PHPUnit** in der 5er Version zum Ausführen von Tests.
* **[Symfony 2.7](https://symfony.com/)** als Framework zum erzeugen von Seiten.
* **[Propel 2](http://propelorm.org/)** als Datenbankabstraktionsschicht und für die Schema Versionierung.
* **FOS Rest** ein Bundle, das eine Rest Full API erzeugt.

*Unter **[Erstinstallation](#erstinstallation)** ist beschrieben wie das Projekt aufgesetzt wurde,

## Propel

[Propel](http://propelorm.org/) ist eine Datenbank Abstractions Schicht (ORM) zum Beschleunigen der Entwicklung von Lese und Schreibzugriffen auf die Datenbank.

* Konfiguriert wird Propel über die ```app/config/propel.yml```
* Im Bundle liegt eine Schema-Beschreibung der Tabellen: ```src/BingoBundle/Resources/config/propel/schema.xml```
* Mit Propel werden Basis Models und Klassen mit Methoden zum Handhaben von Daten mit ```app/console propel:build```
* Der Generierte Code wird abgelegt in: ```src/BingoBundle/Propel```

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
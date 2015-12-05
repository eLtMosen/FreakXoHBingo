# Symfony 2

## Erstinstallation

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

## Propel

[Propel](http://propelorm.org/) ist eine Datenbank Abstractions Schicht (ORM) zum Beschleunigen der Entwicklung von Lese und Schreibzugriffen auf die Datenbank.

* Konfiguriert wird Propel über die ```app/config/propel.yml```
* Im Bundle liegt eine Schema-Beschreibung der Tabellen: ```src/BingoBundle/Resources/config/propel/schema.xml```
* Mit Propel werden Basis Models und Klassen mit Methoden zum Handhaben von Daten mit ```app/console propel:build```
* Der Generierte Code wird abgelegt in: ```src/BingoBundle/Propel```



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

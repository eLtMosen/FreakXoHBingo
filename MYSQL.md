# MySQL

Gängige Queries und Befehle...

## Verbinden

...

    mysql -h 127.0.0.1 -ubingo -pqwer1234 bingo

## Queries

Alle Klicks löschen:

    TRUNCATE TABLE `bingo_click`;
    
Bestimmtes Icon bzw. Karte entfernen und aus dem Spiel nehmen (muss neu geklickt werden):

    DELETE FROM bingo_click WHERE card LIKE '2';

...

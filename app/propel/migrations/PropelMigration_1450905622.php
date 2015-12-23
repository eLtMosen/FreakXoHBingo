<?php

/**
 * Data object containing the SQL and PHP code to migrate the database
 * up to version 1450905622.
 * Generated on 2015-12-23 22:20:22 by ai
 */
class PropelMigration_1450905622
{
    public $comment = '';

    public function preUp($manager)
    {
        // add the pre-migration code here
    }

    public function postUp($manager)
    {
        // add the post-migration code here
    }

    public function preDown($manager)
    {
        // add the pre-migration code here
    }

    public function postDown($manager)
    {
        // add the post-migration code here
    }

    /**
     * Get the SQL statements for the Up migration
     *
     * @return array list of the SQL strings to execute for the Up migration
     *               the keys being the datasources
     */
    public function getUpSQL()
    {
        return array (
  'default' => '
# This is a fix for InnoDB in MySQL >= 4.1.x
# It "suspends judgement" for fkey relationships until are tables are set.
SET FOREIGN_KEY_CHECKS = 0;

ALTER TABLE `bingo_player` ADD `uid` VARCHAR(32) AFTER `id`;

CREATE TABLE `bingo_klick` (
    `id` BIGINT(20) UNSIGNED NOT NULL AUTO_INCREMENT,
    `game_id` BIGINT(20) UNSIGNED,
    `player_id` BIGINT(20) UNSIGNED,
    `card` VARCHAR(16) DEFAULT \'\',
    `x` VARCHAR(16) DEFAULT \'\',
    `y` VARCHAR(16) DEFAULT \'\',
    `time_create` DATETIME,
    `time_stamp` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    INDEX `I_Bingo_GameId` (`game_id`),
    INDEX `I_Bingo_PlayerId` (`player_id`),
    CONSTRAINT `FK_Bingo_KlickToGame`
        FOREIGN KEY (`game_id`)
        REFERENCES `bingo_game` (`id`),
    CONSTRAINT `FK_Bingo_KlickToPlayer`
        FOREIGN KEY (`player_id`)
        REFERENCES `bingo_player` (`id`)
) ENGINE=InnoDB CHARACTER SET=\'utf8\' COLLATE=\'utf8_unicode_ci\';

# This restores the fkey checks, after having unset them earlier
SET FOREIGN_KEY_CHECKS = 1;
',
);
    }

    /**
     * Get the SQL statements for the Down migration
     *
     * @return array list of the SQL strings to execute for the Down migration
     *               the keys being the datasources
     */
    public function getDownSQL()
    {
        return array (
  'default' => '
# This is a fix for InnoDB in MySQL >= 4.1.x
# It "suspends judgement" for fkey relationships until are tables are set.
SET FOREIGN_KEY_CHECKS = 0;

DROP TABLE IF EXISTS `bingo_klick`;

ALTER TABLE `bingo_player` DROP `uid`;

# This restores the fkey checks, after having unset them earlier
SET FOREIGN_KEY_CHECKS = 1;
',
);
    }

}
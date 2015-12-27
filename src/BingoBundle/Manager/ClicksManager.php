<?php

namespace BingoBundle\Manager;

use Propel\Runtime\Propel;

/**
 * Class ClicksManger
 *
 * @package BingoBundle\Manager
 */
class ClicksManager
{
    /**
     * Get Card Clicks count within Seconds.
     *
     * @param int $seconds
     * @return array
     */
    public function getCardClicksData($seconds = 45)
    {
        $query = "
            SELECT game_id,card,count(card) as clicks
            FROM `bingo_click`
            WHERE time_create > (NOW() - INTERVAL {$seconds} SECOND)
            GROUP BY card
            ORDER BY clicks DESC
        ";

        $con = Propel::getConnection();
        $stmt = $con->prepare($query);
        $stmt->execute();
        $clickResult = $stmt->fetchAll(\PDO::FETCH_ASSOC);

        return $clickResult;
    }
}

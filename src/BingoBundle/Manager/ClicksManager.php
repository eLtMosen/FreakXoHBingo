<?php

namespace BingoBundle\Manager;

use BingoBundle\Propel\ClickQuery;
use BingoBundle\Propel\Map\ClickTableMap;
use Propel\Runtime\ActiveQuery\Criteria;
use Propel\Runtime\Propel;

/**
 * Class ClicksManager
 *
 * @package BingoBundle\Manager
 */
class ClicksManager
{
    /**
     * @return array
     */
    public function getCardClicksData()
    {
        $clicksQuery = new ClickQuery();
        $clicksQuery->groupBy(ClickTableMap::COL_CARD);
        $clicksQuery->orderByTimeCreate(Criteria::DESC);
        $clicks = $clicksQuery->find();

        // -- Copy Object to Array
        $clicksData = array();

        foreach ($clicks as $row => $click) {
            $clicksData[$row]['id'] = $click->getId();
            $clicksData[$row]['card'] = $click->getCard();
            $clicksData[$row]['clicks'] = $click->get();
            $clicksData[$row]['sort_order'] = $row;
        }

        return $clicksData;
    }

    /**
     * Methode zum Auslesen von Klicks, die mind. innerhalb eines Intervals erfolgt sind.
     *
     * @param int $interval
     * @return array
     */
    public function getCardClicksDataWithinInterval($interval = 45)
    {
        $query = "
            SELECT bc.game_id,
                   bc.player_id,
                   bc.card,
                   COUNT(bc.card) AS clicks,
                   MAX(bc.time_create) AS time_create_max
            FROM `bingo_click` bc
            WHERE (
                SELECT COUNT(*) AS count_within_interval
                FROM `bingo_click` bcwi
                WHERE bcwi.card=bc.card
                AND (bcwi.time_create > (bcwi.time_create - INTERVAL {$interval} SECOND)
                OR bcwi.time_create > (bcwi.time_create + INTERVAL {$interval} SECOND))
                GROUP BY bcwi.card
            ) > 5
            GROUP BY bc.card
            HAVING COUNT(bc.card) > 5
            ORDER BY clicks DESC
        ";

        $con = Propel::getConnection();
        $stmt = $con->prepare($query);
        $stmt->execute();
        $clickResult = $stmt->fetchAll(\PDO::FETCH_ASSOC);

        return $clickResult;
    }

    /**
     * Get Card Clicks count within Seconds.
     *
     * @param int $seconds
     * @return array
     */
    public function getCardClicksDataWithinSeconds($seconds = 45)
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

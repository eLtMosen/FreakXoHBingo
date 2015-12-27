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
     * @return \BingoBundle\Propel\Click[]|\Propel\Runtime\Collection\ObjectCollection
     */
    public function getCardClicksDataWithinInterval()
    {
        /*
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
        */

        //HAVING (time_create2 > (now() - INTERVAL 45 MINUTE))
        //TIMESTAMPDIFF(YEAR, FROM_UNIXTIME(dob), NOW())

        $query = "
SELECT game_id,player_id,card,count(card) as clicks,max(time_create) as time_create
FROM `bingo_click`
GROUP BY card
HAVING COUNT(card) > 5
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

<?php

namespace BingoBundle\Controller;

// these import the "@Route", "@Method", "@ParamConverter" and "@Template" annotations...
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
//use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;

// these import the "@View" annotations for FOS Rest Bundle...
use FOS\RestBundle\Controller\Annotations as Rest;

use BaseBundle\Controller\AbstractRestController;
use Symfony\Component\HttpKernel\Kernel;

/**
 * Class RestClicksController
 *
 * @package BingoBundle\Controller
 */
class RestClicksController extends AbstractRestController
{
    /**
     * Methode zum Erhalten einer Liste der zuletzt getätigten Klicks innerhalb eines Spiels.
     *
     * @Route("/rest/clicks", name="bingo_rest_list_clicks", defaults={ "_format" = "json" })
     * @Method("GET")
     * @Rest\View()
     * @return array
     */
    public function listAction()
    {
        $clicksManager = $this->getClicksManager();
        $clicks = $clicksManager->getCardClicksWithinInterval();
        $clicksData = array();

        foreach ($clicks as $row => $click) {
            $clicksData[$row] = $click->toArray();
            $clicksData[$row]['sort_order'] = $row;
        }

        return array(
            'name' => 'FreakXoHBingo',
            'version' => Kernel::VERSION,
            'clicks' => $clicksData
        );
    }

    // -- PROTECTED ----------------------------------------------------------------------------------------------------

    /**
     * @return \BingoBundle\Manager\ClicksManager
     */
    protected function getClicksManager()
    {
        return $this->get('bingo.clicks.manager');
    }
}

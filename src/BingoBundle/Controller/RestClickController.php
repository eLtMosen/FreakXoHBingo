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
use BingoBundle\Manager\ClicksManager;
use BingoBundle\Propel\Click;
use BingoBundle\Propel\ClickQuery;
use Propel\Runtime\Propel;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Kernel;

/**
 * Class RestclickController
 *
 * @package BingoBundle\Controller
 */
class RestClickController extends AbstractRestController
{
    /**
     * Methode zum Festhalten eines Klicks eines Spielers innerhalb eines Spiels.
     *
     * @Route("/rest/click", name="bingo_rest_click", defaults={ "_format" = "json" })
     * @Method("GET")
     * @Rest\View()
     * @return array
     */
    public function getClickAction()
    {
        return array(
            'name' => 'FreakXoHBingo',
            'version' => Kernel::VERSION,
            'clicks' => $this->getClicksManager()->getCardClicksDataWithinSeconds()
        );
    }

    /**
     * Methode zum Festhalten eines Klicks eines Spielers innerhalb eines Spiels.
     *
     * @Route("/rest/click", name="bingo_rest_click_post", defaults={ "_format" = "json" })
     * @Method("POST")
     * @Rest\View()
     * @param Request $request
     * @return array
     */
    public function createClickAction(Request $request)
    {
        if ($request->getMethod() == 'POST') {
            $clickRequestData = array();

            if (0 === strpos($request->headers->get('Content-Type'), 'application/json')) {
                $clickRequestData = json_decode($request->getContent(), true);
                //$request->replace(is_array($data) ? $data : array());
            }

            $click = new Click();
            $click->setCard($clickRequestData['card']);
            $click->save();
        }

        return array(
            'name' => 'FreakXoHBingo',
            'version' => Kernel::VERSION,
            'clicks' => $this->getClicksManager()->getCardClicksDataWithinSeconds()
        );
    }

    // -- PROTECTED ----------------------------------------------------------------------------------------------------

    /**
     * @return ClicksManager
     */
    protected function getClicksManager()
    {
        return $this->get('bingo.clicks.manager');
    }
}

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
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Kernel;

/**
 * Class RestKlickController
 *
 * @package BingoBundle\Controller
 */
class RestClickController extends AbstractRestController
{
    /**
     * Methode zum Festhalten eines Klicks eines Spielers innerhalb eines Spiels.
     *
     * @Route("/rest/klick", name="bingo_rest_click_post", defaults={ "_format" = "json" })
     * @Method("POST")
     * @Rest\View()
     * @return array
     */
    public function getClickAction()
    {
        $clicksData = array();

        return array(
            'name' => 'FreakXoHBingo',
            'version' => Kernel::VERSION,
            'games' => $clicksData
        );
    }

    /**
     * Methode zum Festhalten eines Klicks eines Spielers innerhalb eines Spiels.
     *
     * @Route("/rest/klick", name="bingo_rest_click_post", defaults={ "_format" = "json" })
     * @Method("POST")
     * @Rest\View()
     * @param Request $request
     * @return array
     */
    public function createClickAction(Request $request)
    {
        $clicksData = array();

        return array(
            'name' => 'FreakXoHBingo',
            'version' => Kernel::VERSION,
            'games' => $clicksData
        );
    }
}

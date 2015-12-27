<?php

namespace BingoBundle\Controller;

// these import the "@Route", "@Method", "@ParamConverter" and "@Template" annotations
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
//use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;

use BaseBundle\Controller\AbstractController;
use Symfony\Component\HttpKernel\Kernel;

/**
 * Class ClickController
 *
 * @package BingoBundle\Controller
 */
class ClickController extends AbstractController
{
    /**
     * The Click Stats Action.
     *
     * @Route("/clicks", name="bingo_clicks")
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function listAction()
    {
        $clicksData = $this->getClicksManager()->getCardClicksData();

        return $this->render(
            'BingoBundle:Click:list.html.twig',
            array(
                'name' => 'FreakXoHBingo',
                'version' => Kernel::VERSION,
                'clicks' => $clicksData
            )
        );
    }

    // -- PROTECTED ----------------------------------------------------------------------------------------------------

    /**
     * @return \BingoBundle\Manager\ClicksManager
     */
    protected function getClicksManager()
    {
        return $this->get('bingo.clicks');
    }
}

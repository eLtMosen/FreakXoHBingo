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
 * Class IndexController
 *
 * @package BingoRestBundle\Controller
 */
class ShowviewController extends AbstractController
{
    /**
     * The Index Action.
     *
     * @Route("/showview/", name="bingo_showview")
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function showviewAction()
    {
        return $this->render(
            'BingoBundle:Page:showview.html.twig',
            array(
                'name' => 'FreakXoHBingo Showview Monitor',
                'version' => Kernel::VERSION
            )
        );
    }
}

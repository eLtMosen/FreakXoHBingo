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
class PageController extends AbstractController
{
    /**
     * The Index Action.
     *
     * @Route("/", name="bingo_index")
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function indexAction()
    {
        return $this->render(
            'BingoBundle:Page:index.html.twig',
            array(
                'name' => 'FreakXoHBingo',
                'version' => Kernel::VERSION
            )
        );
    }
}

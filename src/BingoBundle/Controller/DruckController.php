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
class DruckController extends AbstractController
{
    /**
     * The Index Action.
     *
     * @Route("/druck/", name="bingo_a4druck")
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function druckAction()
    {
        return $this->render(
            'BingoBundle:Page:a4druck.html.twig',
            array(
                'name' => 'FreakXoHBingo Druck',
                'version' => Kernel::VERSION
            )
        );
    }
}

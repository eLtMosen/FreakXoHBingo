<?php

namespace BingoBundle\Controller;

// these import the "@Route", "@Method", "@ParamConverter" and "@Template" annotations
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
//use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;

use BaseBundle\Controller\AbstractBaseController;
use Symfony\Component\HttpKernel\Kernel;

/**
 * Class IndexController
 *
 * @package BingoRestBundle\Controller
 */
class PageController extends AbstractBaseController
{
    /**
     * The Index Action.
     *
     * @Route("/", name="bingo_index")
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

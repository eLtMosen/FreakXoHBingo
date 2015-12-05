<?php

namespace BingoBundle\Controller;

use BaseBundle\Controller\AbstractBaseController;

// these import the "@Route", "@Method" and "@Template" annotations
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
//use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;

use Symfony\Component\HttpKernel\Kernel;


/**
 * Class IndexController
 *
 * @package BingoBundle\Controller
 */
class IndexController extends AbstractBaseController
{
    /**
     * The index action.
     *
     * @Route("/", name="frontend_theme_index_index")
     */
    public function indexAction()
    {
        return $this->render(
            'BingoBundle::index.html.twig',
            array(
                'name' => 'FreakXoHBingo',
                'version' => Kernel::VERSION
            )
        );
    }
}

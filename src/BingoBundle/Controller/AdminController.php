<?php

namespace BingoBundle\Controller;

// these import the "@Route", "@Method", "@ParamConverter" and "@Template" annotations
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
//use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;

use BaseBundle\Controller\AbstractAdminController;
use Symfony\Component\HttpKernel\Kernel;

/**
 * Class AdminGamesController
 *
 * @package BingoBundle\Controller
 */
class AdminController extends AbstractAdminController
{
    /**
     * The Admin Index Action.
     *
     * @Route("/admin", name="bingo_admin_index")
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function indexAction()
    {
        return $this->render(
            'BingoBundle:Admin:index.html.twig',
            array(
                'name' => 'FreakXoHBingo',
                'version' => Kernel::VERSION
            )
        );
    }
}

<?php

namespace BingoBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class DefaultController extends Controller
{
    public function indexAction($name)
    {
        return $this->render('BingoBundle:Default:index.html.twig', array('name' => $name));
    }
}

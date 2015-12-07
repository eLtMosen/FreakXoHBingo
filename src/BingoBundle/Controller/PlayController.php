<?php

namespace BingoBundle\Controller;

// these import the "@Route", "@Method", "@ParamConverter" and "@Template" annotations
use BingoBundle\Propel\GameQuery;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
//use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;

use BaseBundle\Controller\AbstractController;
use Symfony\Component\HttpKernel\Kernel;

/**
 * Class PlayController
 *
 * @package BingoBundle\Controller
 */
class PlayController extends AbstractController
{
    /**
     * Play the Game Action.
     *
     * @Route("/play/{slug}", name="bingo_play")
     * @param string $slug
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function indexAction($slug)
    {
        $locale = 'de_DE';

        $gamesQuery = new GameQuery();
        $gamesQuery->joinWithI18n($locale);
        $game = $gamesQuery->findOneBySlug($slug);

        return $this->render(
            'BingoBundle:Play:play.html.twig',
            array(
                'name' => 'FreakXoHBingo',
                'version' => Kernel::VERSION,
                'game' => $game
            )
        );
    }
}

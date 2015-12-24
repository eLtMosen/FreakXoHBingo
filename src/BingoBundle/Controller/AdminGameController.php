<?php

namespace BingoBundle\Controller;

// these import the "@Route", "@Method", "@ParamConverter" and "@Template" annotations...
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
//use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;

// these import the "@View" annotations for FOS Rest Bundle...
use FOS\RestBundle\Controller\Annotations as Rest;

use BaseBundle\Controller\AbstractAdminController;
use BingoBundle\Propel\Game;
use BingoBundle\Propel\GameQuery;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Kernel;

/**
 * Class AdminGameController
 *
 * @package BingoBundle\Controller
 */
class AdminGameController extends AbstractAdminController
{
    /**
     * Methode zum Erstellen oder zum Bearbeiten eines Spiels.
     *
     * @Route("/admin/game", name="bingo_game")
     * @Route("/admin/rest/game", name="bingo_game_rest_post", defaults={ "_format" = "json" })
     * @Method("POST")
     * @Rest\View()
     * @param Request $request
     * @return array
     */
    public function postAction(Request $request)
    {
        $locale = 'de_DE';

        if ($request->request->has('locale')) {
            $locale = $request->request->get('locale');
        }

        $id = $request->request->get('id', null);
        $slug = $request->request->get('slug');
        $name = $request->request->get('name');

        if (!is_null($id) || !is_numeric($id)) {
            $gamesQuery = new GameQuery();
            $gamesQuery->joinWithI18n($locale);
            $game = $gamesQuery->findOneById($id);
        }

        if (is_null($game)) {
            $game = new Game();
        }

        $game->setSlug($slug);
        $game->setLocale($locale);
        $game->setName($name);
        $game->save();

        return array(
            'name' => 'FreakXoHBingo',
            'version' => Kernel::VERSION,
            'status' => true,
            'game' => $game
        );
    }
}

import express from 'express';
import * as gamesService  from './games.service.js';

const router = express.Router();

const getAllGames = async (req, res) => {
  try {
    const games = await gamesService.getAllGames();

    res.json(games);
  } catch(err) {
    res.send(err);
  }
}

const getGameById = async (req, res) => {
  const { gameId } = req.params;

  try {
    const game = await gamesService.getGameById(gameId);
    
    if (!game) {
      res.sendStatus(404)
      return
    }

    res.json(game);
  } catch(err) {
    res.send(err);
  }
}

const createGame = async (req, res) => {
  const { name, description, editor, price, thumbnail } = req.body;

  try {
    const game = await gamesService.getGameByName(name);

    if (game) {
      res.status(400).send('Game already exist')
      return
    }

    const createdGame = await gamesService.createGame({ name, description, editor, price, thumbnail });

    res.json(createdGame);    
  } catch(err) {
    res.send(err);
  }
}

const updateGameById = async (req, res) => {
  const { gameId } = req.params;
  const { name, description, editor, price, thumbnail } = req.body;

  try {
    const updatedGame = await gamesService.updateGameById({
      gameId,
      payload: {
        name,
        description, 
        editor, 
        price, 
        thumbnail
      }
    });

    res.json(updatedGame)
  } catch(err) {
    res.send(err);
  }
}

const deleteGameById = async (req, res) => {
  const { gameId } = req.params;

  try {
    const game = await gamesService.getGameById(gameId);

    if (!game) {
      res.status(400).send('Game do not exist');
      return
    }

    await gamesService.deleteGameById(gameId);

      res.sendStatus(204)
  } catch(err) {
      res.send(err);
  }
}


router.get('/', getAllGames);
router.get('/:gameId', getGameById);
router.post('/', createGame);
router.patch('/:gameId', updateGameById);
router.delete('/:gameId', deleteGameById);

export default router;
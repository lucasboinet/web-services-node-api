import express from 'express';
import users from '../modules/users/users.routes.js';
import games from '../modules/games/games.routes.js';
import purchases from '../modules/purchases/purchases.routes.js';

const router = express.Router();

router.use('/users', users);
router.use('/games', games);
router.use('/purchases', purchases);

export default router;

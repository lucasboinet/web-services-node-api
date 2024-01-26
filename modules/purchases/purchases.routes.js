import express from 'express';
import * as purchasesService  from './purchases.service.js';
import * as gamesService  from '../games/games.service.js';
import * as usersService  from '../users/users.service.js';

const router = express.Router();

const getAllPurchases = async (req, res) => {
  try {
    const purchases = await purchasesService.getAllPurchases();

    res.json(purchases);
  } catch(err) {
    res.send(err);
  }
}

const getPurchaseById = async (req, res) => {
  const { purchaseId } = req.params;

  try {
    const purchase = await purchasesService.getPurchaseById(purchaseId);
    
    if (!purchase) {
      res.sendStatus(404)
      return
    }

    res.json(purchase);
  } catch(err) {
    res.send(err);
  }
}

const createPurchase = async (req, res) => {
  const { userId, gameId, paymentMethod } = req.body;

  try {
    const game = await gamesService.getGameById(gameId);
    if (!game) {
      res.status(400).send('Game do not exist')
      return
    }

    const user = await usersService.getUserById(userId);
    if (!user) {
      res.status(400).send('User do not exist')
      return
    }

    const purchase = await purchasesService.getPurchaseByUserAndGameId({userId, gameId});
    if (purchase) {
      res.status(400).send('This user already purchased this game')
      return
    }

    const createdPurchase = await purchasesService.createPurchase({ userId, gameId, paymentMethod, total: game.price });

    res.json(createdPurchase);    
  } catch(err) {
    res.send(err);
  }
}

const updatePurchaseById = async (req, res) => {
  const { purchaseId } = req.params;
  const { refundedAt } = req.body;

  try {
    const purchase = await purchasesService.getPurchaseById(purchaseId);

    if (!purchase) {
      res.status(400).send('This user already purchased this game')
      return
    }

    const updatedPurchase = await purchasesService.updatePurchaseById({
      purchaseId,
      payload: {
        refundedAt
      }
    });

    res.json(updatedPurchase)
  } catch(err) {
    res.send(err);
  }
}

/*----------------------------------------------------------------
    Route a protégé en situation réelle car personne 
    est censé pouvoir supprimer une facture sauf admin par exemple
-----------------------------------------------------------------*/
const deletePurchaseById = async (req, res) => {
  const { purchaseId } = req.params;

  try {
    const purchase = await purchasesService.getPurchaseById(purchaseId);

    if (!purchase) {
      res.status(400).send('Purchase do not exist');
      return
    }

    await purchasesService.deletePurchaseById(purchaseId);

      res.sendStatus(204)
  } catch(err) {
      res.send(err);
  }
}


router.get('/', getAllPurchases);
router.get('/:purchaseId', getPurchaseById);
router.post('/', createPurchase);
router.patch('/:purchaseId', updatePurchaseById);
router.delete('/:purchaseId', deletePurchaseById);

export default router;
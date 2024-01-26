import express from 'express';
import * as usersService from './users.service.js'

const router = express.Router();

const getAll = async (req, res) => {
  try {
    const users = await usersService.getAllUsers();

    res.json(users);
  } catch(err) {
    res.send(err);
  }
}

const getUser = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await usersService.getUserById(userId);

    if (!user) {
      res.sendStatus(404)
      return
    }

    res.json(user);
  } catch(err) {
    res.send(err);
  }
}

const createUser = async (req, res) => {
  const { username, email } = req.body;

  try {
    const user = await usersService.getOneByEmail(email);

    if (user) {
      res.status(400).send('User already exist');
      return
    }

    const createdUser = await usersService.createUser({ username, email });

    res.json(createdUser);    
  } catch(err) {
    res.send(err);
  }
}

const updateUser = async (req, res) => {
  const { userId } = req.params;
  const { username, email } = req.body;

  try {
    const user = await usersService.getUserById(userId);

    if (!user) {
      res.status(400).send('User do not exist');
      return
    }

    const updatedUser = await usersService.updateUserById({
      userId,
      payload: {
        username,
        email
      }
    });

    res.json(updatedUser)
  } catch(err) {
    res.send(err);
  }
}

const deleteUser = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await usersService.getUserById(userId);

    if (!user) {
      res.status(400).send('User do not exist');
      return
    }

    await usersService.deleteUserById(userId);

    res.sendStatus(204)
  } catch(err) {
    res.send(err);
  }
}

router.get('/', getAll);
router.post('/', createUser);
router.get('/:userId', getUser);
router.patch('/:userId', updateUser);
router.delete('/:userId', deleteUser);

export default router;
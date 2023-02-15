const { validIfExistUser } = require('../middlewares/user.middleware');
const { Router } = require('express');
const { check } = require('express-validator');
const {
  findAllUsers,
  findOneUser,
  createUser,
  updateUser,
  deleteUser,
} = require('../controllers/user.controller');
const {
  protect,
  protectAccountOwner,
} = require('../middlewares/auth.middleware');

const router = Router();

router.get('/', findAllUsers);

router.get('/:id',validIfExistUser, findOneUser);

router.use(protect);

router.post('/', createUser);

router.patch('/:id',

updateUser);

router.delete('/:id', deleteUser);

module.exports = {
  userRouter: router,
};
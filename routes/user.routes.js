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

router.get('/:id', validIfExistUser, findOneUser);

router.use(protect);

router.post('/', [
  check('name','the name is mandatory').not().isEmpty,
  check('email', 'The email must be mandatory').not().isEmpty(),
  check('email', 'The email must be a correct format').isEmail(),
  check('password', 'The password must be mandatory').not().isEmpty(),
]
,createUser);

router.patch('/:id', validIfExistUser, updateUser);

router.delete('/:id', validIfExistUser, deleteUser);

module.exports = {
  userRouter: router,
};

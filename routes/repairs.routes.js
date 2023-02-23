const { validIfExistUser } = require('../middlewares/user.middleware');
const { Router } = require('express');
const {
  findAllRepairs,
  findOneRepair,
  createRepair,
  updateRepair,
  deleteRepair,
} = require('../controllers/repair.controller');
const { validIfExistRepair } = require('../middlewares/repair.middleware');

const router = Router();

router.get('/', findAllRepairs);

router.get('/:id', validIfExistRepair, findOneRepair);

router.post('/', createRepair);

router.patch('/:id', validIfExistRepair, updateRepair);

router.delete('/:id', validIfExistRepair, deleteRepair);

module.exports = {
  repairRouter: router,
};

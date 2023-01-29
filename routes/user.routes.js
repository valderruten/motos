const { Router } = require("express");
const {
  findUsers,
  findUser,
  updateUser,
  createUser,
  deleteUser,
} = require("../controllers/user.controller");

const router = Router();

router.get("/", findUsers);

router.get("/:id", findUser);

router.patch("/:id", updateUser);

router.post("/", createUser);

router.delete("/:id", deleteUser);

module.exports = {
  usersRouter: router,
};

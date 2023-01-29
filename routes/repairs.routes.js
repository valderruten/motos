const { Router } = require("express");
const {
  findOrders,
  findOrder,
  createOrder,
  updateOrder,
  deleteOrder,
} = require("../controllers/repair.controller");

const router = Router();

router.get("/", findOrders);

router.get("/:id", findOrder);

router.post("/", createOrder);

router.patch("/:id", updateOrder);

router.delete("/:id", deleteOrder);

module.exports = {
  repairsRouter: router,
};

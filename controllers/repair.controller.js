const Repair = require("../models/repair.model");

exports.findOrders = async (req, res) => {
  try {
    const repairs = await Repair.findAll({
      where: {
        status: "pending",
      },
    });

    res.status(200).json({
      status: "success",
      message: "Orders were successfully found",
      repairs,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "fail",
      message: "Internal server error",
    });
  }
};
exports.findOrder = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Repair.findOne({
      where: {
        id,
        status: "pending",
      },
    });

    if (!order) {
      return res.status(404).json({
        status: "error",
        message: "The order was not found",
      });
    }

    return res.status(200).json({
      status: "success",
      message: "Order was successfully found",
      order,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "fail",
      message: "Internal server error",
    });
  }
};

exports.createOrder = async (req, res) => {
  try {
    const { date, userId } = req.body;

    const newOrder = await Repair.create({
      date,
      userId,
    });

    res.status(201).json({
      status: "success",
      message: "The order was created successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "fail",
      message: "Internal server error",
    });
  }
};
exports.updateOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const order = await Repair.findOne({
      where: {
        status: "pending",
        id,
      },
    });
    if (!order) {
      return res.status(404).json({
        status: "error",
        message: "Order not found",
      });
    }
    await order.update({ status });
    res.status(200).json({
      status: "success",
      message: "Order  updated successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "fail",
      message: "Internal server error",
    });
  }
};

exports.deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Repair.findOne({
      where: {
        status: "pending",
        id,
      },
    });

    if (!order) {
      return res.status(404).json({
        status: "error",
        message: "User not found",
      });
    }

    await order.update({ status: "cancelled" });
    res.status(200).json({
      status: "cancelled",
      message: "order cancelled successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "fail",
      message: "Internal server error",
    });
  }
};

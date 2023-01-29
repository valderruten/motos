const User = require("../models/user.model");

const findUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      where: {
        status: "available",
      },
    });

    res.status(200).json({
      status: "Success",
      message: "Users was found successfully",
      users,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "fail",
      message: "Internal server error",
    });
  }
};
const findUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findOne({
      where: {
        status: "available",
        id,
      },
    });
    if (!user) {
      return res.status(404).json({
        status: "error",
        message: "User not found",
      });
    }
    res.status(200).json({
      status: "success",
      message: "User was found successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "fail",
      message: "Internal server error",
    });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;

    const { username, email } = req.body;

    const user = await User.findOne({
      where: {
        status: "available",
        id,
      },
    });

    if (!user) {
      return res.status(404).json({
        status: "error",
        message: "User not found",
      });
    }

    await user.update({ username, email });

    res.status(200).json({
      status: "success",
      message: "User updated successfully",
    });
  } catch (error) {
    return res.status(500).json({
      status: "fail",
      message: "Internal server error",
    });
  }
};

const createUser = async (req, res) => {
  try {
  } catch (error) {
    return res.status(500).json({
      status: "fail",
      message: "Internal server error",
    });
  }

  const { name, email, password } = req.body;

  const user = await User.create({
    name: name.toLowerCase(),
    email: email.toLowerCase(),
    password,
  });

  res.status(201).json({
    status: "success",
    message: "User created successfully",
    user,
  });
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findOne({
      where: {
        status: "available",
        id,
      },
    });

    if (!user) {
      return res.status(404).json({
        status: "error",
        message: "User not found",
      });
    }

    await user.update({ status: false });

    res.status(200).json({
      status: "success",
      message: "User deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      status: "fail",
      message: "Internal server error",
    });
  }
};
module.exports = {
  findUsers,
  findUser,
  updateUser,
  createUser,
  deleteUser,
};

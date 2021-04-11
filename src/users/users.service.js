const mongoose = require("mongoose");
const User = require("./users.model");
const ObjectId = mongoose.Types.ObjectId;
const fs = require("fs-extra");

class ServiceUser {
  constructor() {}

  getAllUsers = async function () {
    try {
      return await User.find({});
    } catch (e) {
      console.log(e);
    }
  };


  getUserById = async function (id) {
    try {
      return await User.findById(id);
    } catch (e) {
      console.log(e);
    }
  };

  addUser = async function (body) {
    const user = new User(body);
    await user.save();
    if (!(await fs.pathExists(`public/images/users/${user._id}`))) {
      await fs.ensureDir(`public/images/users/${user._id}`);
    }
    const token = await user.generateAuthToken();
    return { user, token };
  };

  updateUserById = async function (id, body) {
    try {
      return await User.findByIdAndUpdate(id, body);
    } catch (e) {
      console.log(e);
    }
  };

  deleteUserById = async function (id) {
    try {
      if (await fs.pathExists(`public/images/users/${id}`)) {
        await fs.remove(`public/images/users/${id}`);
      }
      return await User.deleteOne({ _id: id });
    } catch (e) {
      console.log(e);
    }
  };


  loginUser = async function (login, password) {
    const user = await User.findByCredentials(login, password);
    const token = await user.generateAuthToken();
    return { user, token };
  };
}

module.exports = ServiceUser;

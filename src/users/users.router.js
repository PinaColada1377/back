const express = require('express');
const UserController = require('./users.controller');
const auth = require('../middleware/auth');
const { validation, schema } = require('../middleware/user.schema.valid')

const userController = new UserController();

const routerUsers = new express.Router();

routerUsers.get("/", auth, userController.getAllUser);
routerUsers.get("/:id", auth, userController.getUserById);

routerUsers.post("/add", validation(schema), userController.addUser);
routerUsers.put(
  "/update/:id",
  validation(schema),
  auth,
  userController.updateUserById
);
routerUsers.delete("/delete/:id", auth, userController.deleteUserById);
routerUsers.post("/login", userController.loginUser);


module.exports = routerUsers;
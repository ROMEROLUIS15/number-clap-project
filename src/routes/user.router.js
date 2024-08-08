// routes/user.routes.js
const express = require('express');
const { createUser, verifyUser, getAllUsers, getUser, updateUser, deleteUser, login, logout, getLoggedUser } = require('../controllers/user.controllers');
const verifyJWT = require('../middlewares/verifyJWT');

const userRouter = express.Router();

userRouter.route('/users')
    .get(getAllUsers)
    .post(createUser);

userRouter.route('/users/verify-code-register')
    .post(verifyUser);

userRouter.route('/users/login')
    .post(login);

userRouter.route('/users/me')
    .get(verifyJWT,getLoggedUser);

userRouter.route('/users/logout')
    .post(logout);

userRouter.route('/users/:id')
    .get(verifyJWT, getUser)
    .patch(updateUser)
    .delete(deleteUser);

module.exports = userRouter;

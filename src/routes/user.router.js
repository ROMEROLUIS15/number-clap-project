const express = require('express')
const { getAllUsers, createUser, getUser, updateUser, deleteUser, login, logout, getLoggedUser } = require('../controllers/user.controllers')
const verifyJWT = require('../utils/verifyJWT.js')

const userRouter = express.Router()

userRouter.route('/users')
.get(getAllUsers)
.post(createUser)

userRouter.route('/users/login')
.post(login)

userRouter.route('/users/me')
.get(verifyJWT, getLoggedUser)

userRouter.route('/users/logout')
.post(logout)

userRouter.route('/users/:id')
.get(verifyJWT, getUser)
.patch(updateUser)
.delete(deleteUser)


module.exports = userRouter
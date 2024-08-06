// routes/password.routes.js
const express = require('express');
const { sendRecoveryCode, updatePassword } = require('../controllers/password.controller');

const passwordRouter = express.Router();

passwordRouter.route('/users/recovery-password')
     .post(sendRecoveryCode)

passwordRouter.route('/users/update-password')
    .post(updatePassword)

module.exports = passwordRouter;

const { Router } = require('express');
const LoginController = require('../../controllers/auth/LoginController');

const loginRouter = Router();

loginRouter.post('/login', LoginController.login);

module.exports = loginRouter;

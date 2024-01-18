const { Router } = require('express');
const UserController = require('../../controllers/user/UserController');

const userRouter = Router();

userRouter.post('/users', UserController.createUser);


module.exports = userRouter;
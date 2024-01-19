const { Router } = require('express');
const UserController = require('../../controllers/user/UserController');
const validateToken = require('../../middlewares/verifyToken');

const userRouter = Router();

userRouter.post('/users', UserController.createUser);
userRouter.put('/users/:id', validateToken.verifyToken, UserController.updateUser);
userRouter.get('/users/:id', UserController.getUserById);
userRouter.delete('/users/:id', validateToken.verifyToken, UserController.deleteUser);


module.exports = userRouter;
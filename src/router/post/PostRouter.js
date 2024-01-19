const { Router } = require('express');
const PostController = require('../../controllers/post/PostController');
const validateToken = require('../../middlewares/verifyToken');

const postRouter = Router();

postRouter.post('/posts', validateToken.verifyToken, PostController.createPost);
postRouter.get('/posts', PostController.getAllPost);
postRouter.get('/posts/:id', PostController.getPostById);
postRouter.put('/posts/:id', validateToken.verifyToken, PostController.updatePost);
postRouter.delete('/posts/:id', validateToken.verifyToken, PostController.deletePost);

module.exports = postRouter;
const PostService = require('../../services/post/PostService');

const PostController = {

  createPost: async (req, res) => {
    const { body, email } = req;
    const newPost = await PostService.createPost(body, email);

    res.status(201).json(newPost);
  },

  getAllPost: async (_req, res) => {
    const allPost = await PostService.getAllPost();
    res.status(200).json(allPost);
  },

  getPostById: async (req, res) => {
    const { id } = req.params;
    const post = await PostService.getPostById(id);
    res.status(200).json(post);
  },

  updatePost: async (req, res) => {
    const { body, email } = req;
    const { id } = req.params;
    const updatePost = await PostService.updatePost(body, id, email);
    res.status(200).json(updatePost);
  },

  deletePost: async (req, res) => {
    const { id } = req.params;
    const { email } = req;
    const deletePost = await PostService.deletePost(id, email);
    res.status(200).json(deletePost);
  },
}

module.exports = PostController;

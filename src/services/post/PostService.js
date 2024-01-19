const postModel = require('../../models/post/PostModel');
const userModel = require('../../models/user/UserModel');
const joiPost = require('../../middlewares/joiBodyPost');

const PostService = {

  createPost: async (body, email) => {
    const data = joiPost(body);

    //Se o email provido pelo token não existir, lança um erro
    if(!email) throw new Error('401|Unauthorized');
    
    // Busco o dado do usuário através do email provido pelo token
    const user = await userModel.findOne({ email });

    // Verifico se o usuário existe
    if(!user) throw new Error('404|User not found');

    const newPost = await postModel.create({
      title: data.title,
      content: data.content,
      userId: user.id,
    });

    return newPost;
  },

  getAllPost: async () => {
    const allPost = await postModel.find();
    if(!allPost) throw new Error('404|Post not found');
    return allPost;
  },

  getPostById: async (id) => {
    const post = await postModel.findById(id);
    if(!post) throw new Error('404|Post not found');
    return post;
  },

  updatePost: async (body, id, email) => {
    const data = joiPost(body);

    //Se o email provido pelo token não existir, lança um erro
    if(!email) throw new Error('401|Unauthorized');
    
    // Busco o dado do usuário através do email provido pelo token
    const user = await userModel.findOne({ email });
    if(!user) throw new Error('404|User not found');

    // Busco o post pelo id
    const post = await postModel.findById(id);
    if(!post) throw new Error('404|Post not found');

    // Verifico se o userId no post é igual ao referente ao id vinculado ao email do token.
    if(post.userId !== user.id) throw new Error('401|Unauthorized');

    const updatePost = await postModel.findByIdAndUpdate(
      {_id: id},
      { $set: { 
        title: data.title,
        content: data.content,
        content: data.content,
        userId: user.id,
      }},{ new: true }
    );

    return updatePost;
  },

  deletePost: async (id, email) => {
    //Se o email provido pelo token não existir, lança um erro
    if(!email) throw new Error('401|Unauthorized');
    
    // Busco o dado do usuário através do email provido pelo token
    const user = await userModel.findOne({ email });
    if(!user) throw new Error('404|User not found');

    // Busco o post pelo id
    const post = await postModel.findById(id);
    if(!post) throw new Error('404|Post not found');

    // Verifico se o userId no post é igual ao referente ao id vinculado ao email do token.
    if(post.userId !== user.id) throw new Error('401|Unauthorized');

    const deletePost = await postModel.deleteOne({ _id: id });

    return deletePost;
  },

}

module.exports = PostService;

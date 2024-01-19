const userModel = require('../../models/user/UserModel');
const joiUser = require('../../middlewares/joiBodyUser');
const encrypt = require('../../helper/encrypt');

const UserServices = {

  createUser: async (body) => {

    // Valido o corpo da requisição
    const check = joiUser(body);

    // Busco os dados pelo email no banco de dados
    const user = await userModel.findOne({ email: check.email });

    // Verifico se o email já existe
    if (user) throw new Error('409|user already registered');

    // Criptografo a senha
    const password = encrypt(check.password);

    // Adiciono o usuário no banco de dados
    const newUser = await userModel.create({ 
      displayName: check.displayName,
      email: check.email,
      password 
    });

    return newUser;
  },

  updateUser: async (body, id, email) => {

    // Valido o corpo da requisição
    const check = joiUser(body);

    //Se o email provido pelo token não existir, lança um erro
    if(!email) throw new Error('401|Unauthorized');

    // Busco os dados pelo email no banco de dados
    const user = await userModel.findOne({ email });
    
    if(!user) throw new Error('404|User not found');
    
    // Verifico se o email passado já está cadastrado
    const isEmail = (await userModel.find()).some((user) => user.email === check.email);
    
    // Verifico se o email já existe
    if (isEmail) throw new Error('409|user already registered');

    // Criptografo a senha
    const password = encrypt(check.password);

    // Atualizo o usuário no banco de dados
    const updateUser = await userModel.findByIdAndUpdate(
      { _id: id },
      { $set: { 
        displayName: check.displayName,
        email: check.email,
        password 
      }},
      { new: true }
    );

    return updateUser;
  },
  
  getUserById: async (id) => {
    const result = await userModel.findById(id);
    if(!result) throw new Error('404|User not found');
    return result;
  },

  deleteUser: async (email, id) => {

    //Se o email provido pelo token não existir, lança um erro
    if(!email) throw new Error('401|Unauthorized');

    //Se o id não existir, lança um erro
    if(!id) throw new Error('404|User not found');

    // Busco os dados pelo email no banco de dados
    const user = await userModel.findOne({ email });
    if(!user) throw new Error('404|User not found');
 
    // Verifico se a pessoa que está tentando deletar o usuário é a mesma que está logada
    if (user.id !== id) throw new Error('401|Unauthorized');

    const result = await userModel.findByIdAndDelete({ _id: id }, { new: true });
    return result;
  }

}

module.exports = UserServices;
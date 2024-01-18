const userModel = require('../../models/user/UserModel');
const joiUser = require('../../middlewares/joiBodyUser');
const encrypt = require('../../helper/encrypt');

const UserServices = {

  createUser: async (body) => {

    // Valido o corpo da requisição
    const check = joiUser(body);

    // Busco os dados pelo email no banco de dados
    const user = await userModel.findOne({ email: check.email });

    const users = await userModel.find();

    // Verifico se o id já existe no banco de dados
    if(users.length !== 0) {
      users.forEach((i) => {
        if(i.id === check.id) throw new Error('409|user already registered');
      });
    }

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

    // Personalizo a query para ocultar o campo _id
    const newUserWithoutId = await userModel.findById(newUser._id).select('-_id').lean();

    return newUserWithoutId;
  },

}

module.exports = UserServices;
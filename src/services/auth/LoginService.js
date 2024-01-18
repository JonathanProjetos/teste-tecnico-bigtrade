const userModel = require('../../models/user/UserModel');
const bcryptjs = require('bcryptjs');
const createToken = require('../../middlewares/token');
const joiBodyLoginUser = require('../../middlewares/joiBodyLogin');

const LoginService = {

  login: async (body) => {
    // valido o corpo da requisição
    const check = joiBodyLoginUser(body);

    // busco pelo email no banco de dados
    const user = await userModel.findOne({ email: check.email });

    // verifico se o email existe
    if (!user) throw new Error('404|user not found');

    // verifico se a senha está correta
    if (!bcryptjs.compareSync(check.password, user.password)) {
      throw new Error('401|incorrect password');
    }

    // gero o token
    const token = createToken.generateToken(check.email);

    return token;
  },

}

module.exports = LoginService;
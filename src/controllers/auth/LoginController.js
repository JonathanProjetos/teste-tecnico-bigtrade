const LoginService = require('../../services/auth/LoginService');

const LoginController = {

  login: async (req, res) => {
    const token = await LoginService.login(req.body);
    res.status(200).json({ token });
  },

}

module.exports = LoginController;
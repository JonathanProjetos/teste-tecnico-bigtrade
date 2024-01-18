const UserServices = require('../../services/user/UserService');

const UserController = {

  createUser: async (req, res) => {
    const newUser = await UserServices.createUser(req.body);
    res.status(201).json(newUser);
  },

};

module.exports = UserController;
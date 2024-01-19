const UserServices = require('../../services/user/UserService');

const UserController = {

  createUser: async (req, res) => {
    const newUser = await UserServices.createUser(req.body);
    res.status(201).json(newUser);
  },

  updateUser: async (req, res) => {
    const { id } = req.params;
    const { body } = req;
    const { email } = req;
    const updateUser = await UserServices.updateUser(body, id, email);
    res.status(200).json(updateUser);
  },

  getUserById: async (req, res) => {
    const { id } = req.params;
    const user = await UserServices.getUserById(id);
    res.status(200).json(user);
  },

  deleteUser: async (req, res) => {
    const { id } = req.params;
    const { email } = req;
    const user = await UserServices.deleteUser(email, id);
    res.status(200).json(user);
  },

};

module.exports = UserController;
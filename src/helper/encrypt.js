const bcryptjs = require('bcryptjs');

//Cripitografa a senha
const encryptPassword = (password) => {
  const salt = bcryptjs.genSaltSync(10);
  return bcryptjs.hashSync(password, salt);
};

module.exports = encryptPassword;
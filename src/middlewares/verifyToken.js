const token = require('./token');

//Verifica se o token existe e se é válido. Se não existir ou não for válido, retorna um erro.
module.exports = {
  verifyToken: (req, _res, next) => {
    try {
      const { authorization } = req.headers;
      console.log(authorization);
      const filterBearerSwagger = authorization.split(' ').pop('Bearer');
      const dados = token.validateToken(filterBearerSwagger);
      req.email = dados.email;
      next();
    } catch (err) {
      console.error(err);
      throw new Error('404|Token not found');
    }
  },
};
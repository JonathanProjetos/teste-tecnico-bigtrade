const { expect } = require('chai');
const { describe, it } = require('mocha');
const sinon = require('sinon');
const { login } = require('../../../../controllers/auth/LoginController');
const loginService = require('../../../../services/auth/LoginService');

describe('Testes unitários do controller Auth', () => {
  describe('Testes do método login', () => {
    afterEach(() => sinon.restore());

    const req = {
      body:{
        email: 'test@test.com',
        password: 'dasdasd'
      }
    }
    
    it('Deve retornar os dados com sucesso', async () => {

      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      }

      const token = 'token'

      sinon.stub(loginService, 'login').resolves(token);

      await login(req, res);

      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledWith({ token })).to.be.true;
      expect(loginService.login.calledWith(req.body)).to.be.true;
    });

  })
});
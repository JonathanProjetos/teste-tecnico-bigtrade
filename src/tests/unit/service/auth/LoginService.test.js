const { expect } = require('chai');
const { describe, it } = require('mocha');
const userModel = require('../../../../models/user/UserModel');
const loginService  = require('../../../../services/auth/LoginService');
const sinon = require('sinon');
const bcrypt = require('bcryptjs');

describe('Testes unitários do service Auth', () => {
  describe('Testes do método login', () => {
    afterEach(() => sinon.restore());

    const data = {
      email: 'test@test.com',
      password: bcrypt.hashSync('123456', 10),
    }

    it('Deve retornar os dados do usuário logado', async () => {

      sinon.stub(userModel, 'findOne').resolves({});
      sinon.stub(bcrypt, 'compareSync').resolves(true);

      const singIn = await loginService.login({...data});

      expect(singIn).to.be.a('string');
    });

    it('Deve retornar um erro caso o usuário não exista', async () => {

      sinon.stub(userModel, 'findOne').resolves(null);

      try {
        await loginService.login({...data});
      } catch (error) {
        expect(error.message).to.equal('404|user not found');
      }
    });

    it('Deve retornar um erro caso a senha esteja incorreta', async () => {

      sinon.stub(userModel, 'findOne').resolves({});
      sinon.stub(bcrypt, 'compareSync').resolves(false);

      try {
        await loginService.login({...data});
      } catch (error) {
        expect(error.message).to.equal('401|incorrect password');
      }
    });
  });
});
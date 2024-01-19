const { expect } = require('chai');
const { describe, it } = require('mocha');
const sinon = require('sinon');
const userService = require('../../../../services/user/UserService');
const { 
  createUser,
  updateUser,
  deleteUser,
  getUserById
 } = require('../../../../controllers/user/UserController');

describe('Testes unitários do controller User', () => {
  describe('Teste do método createUser', () => {
    afterEach(() => sinon.restore());

    const req = {
      body:{
        displayName: 'Teste',
        email: 'test@test.com',
      }
    }

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    }

    it('Deve retornar os dados do usuário com sucesso', async () => {

      sinon.stub(userService, 'createUser').resolves(req.body);

      await createUser(req, res);

      expect(res.status.calledWith(201)).to.be.true;
      expect(res.json.calledWith(req.body)).to.be.true;
      expect(userService.createUser.calledWith(req.body)).to.be.true;
    });
  });

  describe('Teste do método updateUser', async () => {
    afterEach(() => sinon.restore());

    const req = {
      body:{
        displayName: 'Teste',
        email: 'test@test.com',
      },
      params: {
        id: '123'
      },
      email:{
        email:'teste@test.com'
      }
    }

    const resolve = {
      acknowledged: true,
      modifiedCount: 1,
      upsertedId: null,
      upsertedCount: 0,
      matchedCount: 1
    }

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    }

    it('deve atualizar os dados do usuário com sucesso', async () => {

      sinon.stub(userService, 'updateUser').resolves(resolve);

      await updateUser(req, res);

      const { id } = req.params;
      const { body } = req;
      const { email } = req;

      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledWith(resolve)).to.be.true;
      expect(userService.updateUser.calledWith(body, id, email )).to.be.true;
    });
  });

  describe('Teste do método getUserById', async () => {
    afterEach(() => sinon.restore());

    const req = {
      params: {
        id: '123'
      },
    }

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    }

    const resolve = {
      _id: "65aa69f0225d07b944f2259c",
      title: "A vida e ruim",
      content: "Realmente ela é muiiiiiitttttoooo",
      userId: "65a9878233caa212b968ad02",
      published: "2024-01-19T12:24:16.190Z",
      updatedAt: "2024-01-19T12:24:16.190Z"
    }

    it('deve retornar o dado usuário com sucesso', async () => {

      sinon.stub(userService, 'getUserById').resolves(resolve);

      const { id } = req.params;
      
      await getUserById(req, res);
  
      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledWith(resolve)).to.be.true;
      expect(userService.getUserById.calledWith(id)).to.be.true;

    });
  });

  describe('Teste do método deleteUser', async () => {
    afterEach(() => sinon.restore());

    const req = {
      params: {
        id: '123'
      },
      email:{
        email:'teste@test.com'
      }
    }

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    }

    const resolve = {
      acknowledged: true,
      deletedCount: 1
    }

    it('deve deletar o usuário com sucesso', async () => {

      sinon.stub(userService, 'deleteUser').resolves(resolve);

      const { id } = req.params;
      const { email } = req;
      
      await deleteUser(req, res);
  
      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledWith(resolve)).to.be.true;
      expect(userService.deleteUser.calledWith(email, id)).to.be.true;

    });

  });
});
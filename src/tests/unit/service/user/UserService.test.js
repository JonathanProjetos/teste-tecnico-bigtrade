const { expect } = require('chai');
const { describe, it } = require('mocha');
const sinon = require('sinon');
const userModel = require('../../../../models/user/UserModel');
const {
  createUser,
  deleteUser,
  getUserById,
  updateUser
} = require('../../../../services/user/UserService');
const e = require('express');

describe('Testes unitários do service User', () => {
  describe('Testes do método createUser', () => {
    afterEach(() => sinon.restore());

    const data = {
      displayName: 'Teste',
      email: 'test@test.com',
      password: '123456',
    }


    it('Deve retornar os dados do usuário cadastrado', async () => {

      sinon.stub(userModel, 'findOne').resolves(null);
      sinon.stub(userModel, 'create').resolves({...data});

      expect(await createUser({...data})).to.deep.equal(data);
    });

    it('Deve retornar um erro caso o usuário já exista', async () => {

      sinon.stub(userModel, 'findOne').resolves({...data});

      try {
        await createUser({...data});
      } catch (error) {
        expect(error.message).to.equal('409|user already registered');
      }
    });

  });

  describe('Testes do método updateUser', () => {
    afterEach(() => sinon.restore());

    const data = {
      displayName: 'Teste',
      email: 'test@test.com',
      password: '123456',
    }

    
    it('Deve retornar um erro caso o usuário não seja o mesmo que está logado', async () => {
      
      const email = null;
      const id = '123';
      
      sinon.stub(userModel, 'findOne').resolves(null);
      
      try {
        await updateUser(data, id, email);
      } catch (error) {
        expect(error.message).to.equal('401|Unauthorized');
      }
    });
    

    // it('Deve retornar um erro caso o email já esteja cadastrado', async () => {

    //   sinon.stub(userModel, 'findOne').resolves({ id: '123' });
    //   // sinon.stub(userModel, 'find').resolves([data][0].email);
      
    //   const email = 'test@test.com'
    //   const id = '123'
      
    //   try {
    //     await updateUser(data, id, email);
    //   } catch (error) {
    //     expect(error.message).to.equal('409|user already registered');
    //   }
    // });

    
    it('Deve retornar os dados do usuário atualizado', async () => {

      sinon.stub(userModel, 'findOne').resolves({ id: '123' });
      sinon.stub(userModel, 'find').resolves([]);
      sinon.stub(userModel, 'findByIdAndUpdate').resolves({...data});

      const email = 'test1@test.com'
      const id = '123'

      expect(await updateUser(data, id, email)).to.deep.equal(data);
    });

  });

  describe('Testes do método getUserById', () => {
    afterEach(() => sinon.restore());

    const data = {
      displayName: 'Teste',
      email: 'test@test.com'
    }

    it('Deve retornar os dados do usuário', async () => {

      sinon.stub(userModel, 'findById').resolves({...data});

      expect(await getUserById('123')).to.deep.equal(data);
    });
  });

  describe('Testes do método deleteUser', () => {
    afterEach(() => sinon.restore());

    const data = {
      displayName: 'Teste',
      email: 'test@test.com'
    }

    it('Deve retornar os dados do usuário deletado', async () => {

      sinon.stub(userModel, 'findOne').resolves({ id: '123' });
      sinon.stub(userModel, 'findByIdAndDelete').resolves({...data});

      const email = 'test@test.com'
      const id = '123'

      expect(await deleteUser(email, id)).to.deep.equal(data);
    });

    it('Deve retornar um erro caso o id do usuário não seja passado', async () => {
      const email = "test@test.com";
      const id = null;

      try {
        await deleteUser(email, id);
      } catch (error) {
        expect(error.message).to.equal('404|User not found');
      }
    });

    it('Deve retornar um erro caso o usuário não seja o mesmo que está logado', async () => {
      const email = null;
      const id = '123';

       try {
        await deleteUser(email, id);
       } catch (error) {
        expect(error.message).to.equal('401|Unauthorized');
       }
    })

    it('Deve retornar um erro caso o usuário não seja encontrado', async () => {
      const email = 'test@test.com';
      const id = '123';

      sinon.stub(userModel, 'findOne').resolves(undefined);

      try {
        await deleteUser(email, id);
      } catch (error) {
        expect(error.message).to.equal('404|User not found');
      }
    });

    it('Deve retornar um erro caso o id do usuário não seja diferente ao vinculado pelo token', async () => {

      sinon.stub(userModel, 'findOne').resolves({ id: '1234' });

      const email = 'test@test.com'
      const id = '1222'

      try {
        await deleteUser(email, id);
      } catch (error) {
        expect(error.message).to.equal('401|Unauthorized');
      }
    });
  });

  
});
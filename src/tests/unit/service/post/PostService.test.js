const { expect } = require('chai');
const { describe, it } = require('mocha');
const sinon = require('sinon');
const postModel = require('../../../../models/post/PostModel');
const userModel = require('../../../../models/user/UserModel');
const {
  createPost,
  deletePost,
  getPostById,
  updatePost,
  getAllPost,
  getAllPostByUser
} = require('../../../../services/post/PostService');

describe('Testes unitários do service Post', () => {

  describe('Testes do método createPost', () => {
    afterEach(() => sinon.restore());

    const data = {
      title: 'Teste',
      content: 'Vai da tudo certoooo',
    }

    it('Deve retornar os dados do post cadastrado', async () => {

      sinon.stub(userModel, 'findOne').resolves({});
      sinon.stub(postModel, 'create').resolves({...data});

      const email = 'test@test.com'

      expect(await createPost({...data}, email)).to.deep.equal(data);
    });

    it('Deve retornar um erro caso o email provido do token não exista', () => {

      sinon.stub(userModel, 'findOne').resolves(null);

      try {
        createPost({...data}, null);
      } catch (error) {
        expect(error.message).to.equal('401|Unauthorized');
      }
    });

    it('Deve retornar um erro caso o usuário não exista', () => {

      sinon.stub(userModel, 'findOne').resolves(null);

      const id = '123'

      try {
        createPost({...data}, id)
      } catch (error) {
        expect(error.message).to.equal('404|User not found');
      }
    });
  })

  describe('Testes do método getAllPost', () => {
    afterEach(() => sinon.restore());

    const data = {
      title: 'Teste',
      content: 'Vai da tudo certoooo',
    }

    it('Deve retornar todos os posts', async () => {

      sinon.stub(postModel, 'find').resolves({...data});

      expect(await getAllPost()).to.deep.equal(data);
    });

    it('Deve retornar um erro caso não exista posts', async () => {
        
        sinon.stub(postModel, 'find').resolves(null);
  
        try {
          await getAllPost();
        } catch (error) {
          expect(error.message).to.equal('404|Post not found');
        }
    });

  });

  describe('Testes do método getPostById', () => {
    afterEach(() => sinon.restore());

    const data = {
      title: 'Teste',
      content: 'Vai da tudo certoooo',
    }

    it('Deve retornar os dados do post', async () => {

      sinon.stub(postModel, 'findById').resolves({...data});

      const id = '123'

      expect(await getPostById(id)).to.deep.equal(data);
    });

    it('Deve retornar um erro caso não exista o post', async () => {
        
        sinon.stub(postModel, 'findById').resolves(null);
  
        const id = '123'

        try {
          await getPostById(id);
        } catch (error) {
          expect(error.message).to.equal('404|Post not found');
        }
    });

  });

  describe('Testes do método updatePost', () => {
    afterEach(() => sinon.restore());

    const data = {
      title: 'Teste',
      content: 'Vai da tudo certoooo',
    }

    it('Deve retornar um erro caso o email provido do token não exista', async () => {

      const email = undefined;
      const id = '123';

      try {
       await updatePost({...data}, id, email);
      } catch (error) {
        expect(error.message).to.equal('401|Unauthorized');
      }
    });

    
    it('Deve retornar um erro caso o usuário não exista', async () => {
        
        sinon.stub(userModel, 'findOne').resolves(null);
        
        const id = '123'
        const email = 'test@test.com'
        
        try {
          await updatePost({...data}, id, email)
        } catch (error) {
          expect(error.message).to.equal('404|User not found');
        }
    });

    it('Deve retornar um erro caso não exista o post', async () => {
          
      sinon.stub(userModel, 'findOne').resolves({ id: '123' });
      sinon.stub(postModel, 'findById').resolves(null);
      
      const email = 'test@test.com';
      const id = '123';
      try {
        await updatePost({...data}, id, email);
      } catch (error) {
        expect(error.message).to.equal('404|Post not found');
      }

    });
    
    it('Deve retornar um erro caso o id do post seja diferente  do userId', async () => {
      
      sinon.stub(userModel, 'findOne').resolves({ id: '123' });
      sinon.stub(postModel, 'findById').resolves({ userId: '1234'});
      
      const email = 'test@test.com';
      const id = '123';
      try {
        await updatePost({...data}, id, email);
      } catch (error) {
        expect(error.message).to.equal('401|Unauthorized');
      }
    });
    it('Deve retornar os dados do post atualizado', async () => {
  
      sinon.stub(userModel, 'findOne').resolves({ id: '123' });
      sinon.stub(postModel, 'findById').resolves({ userId: '123'});
      sinon.stub(postModel, 'findByIdAndUpdate').resolves({...data});

      const email = 'test@test.com'
      const id = '123'
      
      expect(await updatePost({...data}, id, email)).to.deep.equal(data);
        
    });
  })

  describe('Testes do método deletePost', () => {
    afterEach(() => sinon.restore());

    const data = {
      title: 'Teste',
      content: 'Vai da tudo certoooo',
    }

    it('Deve retornar os dados do post deletado', async () => {

      sinon.stub(userModel, 'findOne').resolves({ id: '123' });
      sinon.stub(postModel, 'findById').resolves({ userId: '123'});
      sinon.stub(postModel, 'deleteOne').resolves({...data});

      const email = 'test@test.com'
      const id = '123'

      expect(await deletePost(id , email)).to.deep.equal(data);
    });

    it('Deve retornar um erro caso o email provido do token não exista', async () => {

      const email = null
      const id = '123'

      sinon.stub(userModel, 'findOne').resolves(null);

      try {
        await deletePost(id, email);
      } catch (error) {
        expect(error.message).to.equal('401|Unauthorized');
      }
    });
    
    it('Deve retornar um erro caso o usuário não exista', async () => {
      
      sinon.stub(userModel, 'findOne').resolves(null);
      const email = "test@test.com"
      const id = '123'

      try {
        await deletePost(id, email);
      } catch (error) {
        expect(error.message).to.equal('404|User not found');
      }
    });

    it('Deve retorna um erro caso o post não exista', async () => {
      
      sinon.stub(userModel, 'findOne').resolves({ id: '123' });
      sinon.stub(postModel, 'findById').resolves(null);

      const email = "test@test.com"
      const id = '123'

      try {
        await deletePost(id, email);
      } catch (error) {
        expect(error.message).to.equal('404|Post not found');
      }
    });

    it('Deve retornar um erro caso o id do post seja diferente  do userId', async () => {
        
      sinon.stub(userModel, 'findOne').resolves({ id: '123' });
      sinon.stub(postModel, 'findById').resolves({ userId: '1234'});

      const email = 'test@test.com';
      const id = '123231';

      try {
        deletePost({...data}, id, email);
      } catch (error) {
        expect(error.message).to.equal('401|Unauthorized');
      }
  });
  });

});
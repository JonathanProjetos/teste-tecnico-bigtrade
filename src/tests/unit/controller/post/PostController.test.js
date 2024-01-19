const { expect } = require('chai');
const { describe, it } = require('mocha');
const sinon = require('sinon');
const postService = require('../../../../services/post/PostService');
const { 
  createPost,
  updatePost,
  deletePost,
  getPostById,
  getAllPost
 } = require('../../../../controllers/post/PostController');

describe('Testes unitários do controller postController', () => {
  describe('Teste do método createPost', () => {

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

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    }

    const  resolves = {
      title: "A vida e ruim",
      content: "Realmente ela é muiiiiiitttttoooo",
      userId: "65a9878233caa212b968ad02",
      _id: "65aa69f0225d07b944f2259c",
      published: "2024-01-19T12:24:16.190Z",
      updatedAt: "2024-01-19T12:24:16.190Z"
    }

    it('Deve criar o dado do post com sucesso', async () => {

      sinon.stub(postService, 'createPost').resolves(resolves);

      await createPost(req, res);

      const { body } = req;
      const { email } = req;

      expect(res.status.calledWith(201)).to.be.true;
      expect(res.json.calledWith(resolves)).to.be.true;
      expect(postService.createPost.calledWith(body, email)).to.be.true;
    });
  });

  describe('Teste do método getAllPost', () => {
    afterEach(() => sinon.restore());

    const req = {};

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    }

    const resolves = [{
      title: "A vida e ruim",
      content: "Realmente ela é muiiiiiitttttoooo",
      userId: "65a9878233caa212b968ad02",
      _id: "65aa69f0225d07b944f2259c",
      published: "2024-01-19T12:24:16.190Z",
      updatedAt: "2024-01-19T12:24:16.190Z"
    }]

    it('Deve retornar os dados dos posts com sucesso', async () => {
        
        sinon.stub(postService, 'getAllPost').resolves(resolves);
  
        await getAllPost(req, res);
  
        expect(res.status.calledWith(200)).to.be.true;
        expect(res.json.calledWith(resolves)).to.be.true;
        expect(postService.getAllPost.calledWith()).to.be.true;
    });
  });

  describe('Teste do método getPostById', () => {
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
      title: "A vida e ruim",
      content: "Realmente ela é muiiiiiitttttoooo",
      userId: "65a9878233caa212b968ad02",
      _id: "65aa69f0225d07b944f2259c",
      published: "2024-01-19T12:24:16.190Z",
      updatedAt: "2024-01-19T12:24:16.190Z"
    }

    it('deve retornar o dado do post com sucesso', async () => {

      sinon.stub(postService, 'getPostById').resolves(resolve);

      const { id } = req.params;
      
      await getPostById(req, res);
  
      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledWith(resolve)).to.be.true;
      expect(postService.getPostById.calledWith(id)).to.be.true;

    });
  });

  describe('Teste do método updatePost', () => {
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

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    }


    const resolve = {
      acknowledged: true,
      modifiedCount: 1,
      upsertedId: null,
      upsertedCount: 0,
      matchedCount: 1
    }

    it('deve atualizar os dados do post com sucesso', async () => {
        
        sinon.stub(postService, 'updatePost').resolves(resolve);
  
        await updatePost(req, res);
  
        const { id } = req.params;
        const { body } = req;
        const { email } = req;
  
        expect(res.status.calledWith(200)).to.be.true;
        expect(res.json.calledWith(resolve)).to.be.true;
        expect(postService.updatePost.calledWith(body, id, email )).to.be.true;
    });

  });

  describe('Teste do método deletePost', () => {
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

    it('deve deletar o post com sucesso', async () => {

      sinon.stub(postService, 'deletePost').resolves(resolve);

      const { id } = req.params;
      const { email } = req;
      
      await deletePost(req, res);
  
      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledWith(resolve)).to.be.true;
      expect(postService.deletePost.calledWith(id, email)).to.be.true;
    }); 
  });
});
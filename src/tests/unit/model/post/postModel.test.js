const { expect } = require('chai');
const { describe, it } = require('mocha');
const postModel = require('../../../../models/post/PostModel');

describe('Testes unitários do model Post', () => {
  it('criação de post com o schema correto', () => {
    expect(postModel.schema.obj).to.have.property('title');
    expect(postModel.schema.obj).to.have.property('content');
    expect(postModel.schema.obj).to.have.property('userId');
    expect(postModel.schema.obj.title.type).to.equal(String);
    expect(postModel.schema.obj.content.type).to.equal(String);
    expect(postModel.schema.obj.userId.type).to.equal(String);
  });
});
const { expect } = require('chai');
const { describe, it } = require('mocha');
const userModel = require('../../../../models/user/UserModel');

describe('Testes unitários do model User', () => {
  it('criação de usuário com o schema correto', () => {
    expect(userModel.schema.obj).to.have.property('displayName');
    expect(userModel.schema.obj).to.have.property('email');
    expect(userModel.schema.obj).to.have.property('password');
    expect(userModel.schema.obj.displayName.type).to.equal(String);
    expect(userModel.schema.obj.email.type).to.equal(String);
    expect(userModel.schema.obj.password.type).to.equal(String);
    expect(userModel.schema.obj.displayName.required).to.be.true;
    expect(userModel.schema.obj.email.required).to.be.true;
    expect(userModel.schema.obj.password.required).to.be.true;
  });
});
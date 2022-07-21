const chai = require("chai");
const chaiHttp = require("chai-http");
const sinon = require('sinon');

const db = require('../../src/database/models');

const app = require('../../src/app');

chai.use(chaiHttp);

describe('POST /users', () => {
  it('ao fazer uma requisição com dados válidos deve retornar o status 201 e o usuário criado', async () => {
    // arranjo
    const userMock = {
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      passwordHash: 'pwd12345',
      phone: '(31) 11111-1111'
    };

    sinon.stub(db.User, 'create').resolves({ id: 1, ...userMock});

    // ação
    const { status, body } = await chai.request(app).post('/users').send(userMock);

    // assertiva
    chai.expect(status).to.be.eq(201);
    chai.expect(body).to.be.deep.eq({ id: 1, ...userMock});
  });

  it.only('ao fazer uma requisição sem e-mail deve retornar o status 400', async () => {
    // arranjo
    const userMock = {
      name: 'John Doe',
      passwordHash: 'pwd12345',
      phone: '(31) 11111-1111'
    };

    // ação
    const { status, body } = await chai.request(app).post('/users')
      .send(userMock)

    // assertiva
    chai.expect(status).to.be.eq(400);
    chai.expect(body).to.be.deep.eq({ message: '"email" is required'});
  });

  it.only('ao fazer uma requisição sem nome inválidos deve retornar o status 400', async () => {
    // arranjo
    const userMock = {
      email: 'johndoe@gmail.com',
      passwordHash: 'pwd12345',
      phone: '(31) 11111-1111'
    };

    // ação
    const { status, body } = await chai.request(app).post('/users').send(userMock);

    // assertiva
    chai.expect(status).to.be.eq(400);
    chai.expect(body).to.be.deep.eq({ message: '"name" is required'});
  });
});
const chai = require("chai");
const chaiHttp = require("chai-http");
const sinon = require('sinon');

const db = require('../../src/database/models');

const app = require('../../src/app');
const { expect } = require("chai");

chai.use(chaiHttp);

// versão não funcional!
describe('GET /pets', () => {
  it('deve retornar uma lista', async () => {
    // arranjo
    await chai.request(app).post('/users').send({
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      passwordHash: 'pwd12345',
      phone: '(31) 11111-1111'
    });


    const { body: { token }} = await chai.request(app).post('/login').send({
      email: 'ajfladsj',
      password: 'lfjadslf'
    });

    // ação
    const response = await chai.request(app).get('/pets')
      .set('Authorization', token);

    // assertiva
    expect(response.status).to.be.eq(200);
    expect(response.body).to.be.an('array');
  });

 
});
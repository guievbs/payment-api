const { expect } = require("chai");
const request = require("supertest");
const app = require("../../server"); // Caminho para o seu servidor
const mongoose = require("mongoose");
const User = require("../src/models/User");
const Account = require("../src/models/Account");
const Category = require("../src/models/Category");
const Transaction = require("../src/models/Transaction");

// Configuração para conectar ao MongoDB em modo de teste
before(async () => {
  await mongoose.connect(process.env.MONGO_URI_TEST, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

// Limpar o banco de dados após cada teste
afterEach(async () => {
  await User.deleteMany({});
  await Account.deleteMany({});
  await Category.deleteMany({});
  await Transaction.deleteMany({});
});

// Fechar a conexão com o banco de dados após todos os testes
after(async () => {
  await mongoose.connection.close();
});

// Configuração do servidor para teste
const server = request(app);

// Testes para rotas de Usuário
describe("User Routes", function () {
  it("POST /api/users/register should create a new user", async function () {
    const response = await server.post("/api/users/register").send({
      username: "testuser",
      email: "testuser@example.com",
      password: "password123",
    });
    expect(response.status).to.equal(201);
    expect(response.body).to.have.property("user");
  });

  it("POST /api/users/login should return a token", async function () {
    await server.post("/api/users/register").send({
      username: "testuser",
      email: "testuser@example.com",
      password: "password123",
    });
    const response = await server.post("/api/users/login").send({
      email: "testuser@example.com",
      password: "password123",
    });
    expect(response.status).to.equal(200);
    expect(response.body).to.have.property("token");
  });
});

// Testes para rotas de Conta
describe("Account Routes", function () {
  let token;

  before(async () => {
    const response = await server.post("/api/users/register").send({
      username: "admin",
      email: "admin@example.com",
      password: "admin123",
    });
    const loginResponse = await server
      .post("/api/users/login")
      .send({ email: "admin@example.com", password: "admin123" });
    token = loginResponse.body.token;
  });

  it("POST /api/accounts should create a new account", async function () {
    const response = await server
      .post("/api/accounts")
      .set("Authorization", `Bearer ${token}`)
      .send({ name: "Test Account", balance: 1000 });
    expect(response.status).to.equal(201);
    expect(response.body).to.have.property("name", "Test Account");
  });

  it("GET /api/accounts should list accounts", async function () {
    await server
      .post("/api/accounts")
      .set("Authorization", `Bearer ${token}`)
      .send({ name: "Test Account 1", balance: 500 });
    const response = await server
      .get("/api/accounts")
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).to.equal(200);
    expect(response.body).to.be.an("array");
    expect(response.body.length).to.be.greaterThan(0);
  });
});

// Testes para rotas de Categoria
describe("Category Routes", function () {
  let token;

  before(async () => {
    const response = await server.post("/api/users/register").send({
      username: "admin",
      email: "admin@example.com",
      password: "admin123",
    });
    const loginResponse = await server
      .post("/api/users/login")
      .send({ email: "admin@example.com", password: "admin123" });
    token = loginResponse.body.token;
  });

  it("POST /api/categories should create a new category", async function () {
    const response = await server
      .post("/api/categories")
      .set("Authorization", `Bearer ${token}`)
      .send({ name: "Test Category" });
    expect(response.status).to.equal(201);
    expect(response.body).to.have.property("name", "Test Category");
  });

  it("GET /api/categories should list categories", async function () {
    await server
      .post("/api/categories")
      .set("Authorization", `Bearer ${token}`)
      .send({ name: "Test Category 1" });
    const response = await server
      .get("/api/categories")
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).to.equal(200);
    expect(response.body).to.be.an("array");
    expect(response.body.length).to.be.greaterThan(0);
  });
});

// Testes para rotas de Transação
describe("Transaction Routes", function () {
  let token;

  before(async () => {
    const response = await server.post("/api/users/register").send({
      username: "admin",
      email: "admin@example.com",
      password: "admin123",
    });
    const loginResponse = await server
      .post("/api/users/login")
      .send({ email: "admin@example.com", password: "admin123" });
    token = loginResponse.body.token;
  });

  it("POST /api/transactions should create a new transaction", async function () {
    const response = await server
      .post("/api/transactions")
      .set("Authorization", `Bearer ${token}`)
      .send({
        amount: 100,
        description: "Test Transaction",
        account: "60c72b2f9b1e8b001f6476d4", // Atualize com um ID válido
      });
    expect(response.status).to.equal(201);
    expect(response.body).to.have.property("description", "Test Transaction");
  });

  it("GET /api/transactions should list transactions", async function () {
    await server
      .post("/api/transactions")
      .set("Authorization", `Bearer ${token}`)
      .send({
        amount: 50,
        description: "Test Transaction 1",
        account: "60c72b2f9b1e8b001f6476d4", // Atualize com um ID válido
      });
    const response = await server
      .get("/api/transactions")
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).to.equal(200);
    expect(response.body).to.be.an("array");
    expect(response.body.length).to.be.greaterThan(0);
  });
});

// Testes para rota de instalação
describe("Install Routes", function () {
  it("GET /api/install should install the database", async function () {
    const response = await server.get("/api/install");
    expect(response.status).to.equal(200);
    expect(response.body).to.have.property(
      "msg",
      "Banco de dados instalado com sucesso"
    );
  });
});

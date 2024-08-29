const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");

// Rota para instalar o banco de dados
/**
 * @swagger
 * /install:
 *   get:
 *     summary: Instala o banco de dados com registros padrão
 *     description: Cria 10 usuários padrão na coleção de usuários para a instalação inicial do banco de dados.
 *     responses:
 *       200:
 *         description: Banco de dados instalado com sucesso
 *       500:
 *         description: Erro na instalação
 */
router.get("/install", async (req, res) => {
  try {
    await User.deleteMany({}); // Limpa a coleção de usuários

    // Cria 10 usuários de exemplo
    const users = [
      {
        username: "user1",
        email: "user1@example.com",
        password: "password123",
        isAdmin: false,
      },
      {
        username: "user2",
        email: "user2@example.com",
        password: "password123",
        isAdmin: false,
      },
      {
        username: "user3",
        email: "user3@example.com",
        password: "password123",
        isAdmin: false,
      },
      {
        username: "user4",
        email: "user4@example.com",
        password: "password123",
        isAdmin: false,
      },
      {
        username: "user5",
        email: "user5@example.com",
        password: "password123",
        isAdmin: false,
      },
      {
        username: "user6",
        email: "user6@example.com",
        password: "password123",
        isAdmin: false,
      },
      {
        username: "user7",
        email: "user7@example.com",
        password: "password123",
        isAdmin: false,
      },
      {
        username: "user8",
        email: "user8@example.com",
        password: "password123",
        isAdmin: false,
      },
      {
        username: "user9",
        email: "user9@example.com",
        password: "password123",
        isAdmin: false,
      },
      {
        username: "user10",
        email: "user10@example.com",
        password: "password123",
        isAdmin: false,
      },
    ];

    // Hash de senhas e criação dos usuários
    for (let userData of users) {
      userData.password = await bcrypt.hash(userData.password, 10);
      const user = new User(userData);
      await user.save();
    }

    // Cria um usuário administrador
    const admin = new User({
      username: "admin",
      email: "admin@example.com",
      password: await bcrypt.hash("admin123", 10),
      isAdmin: true,
    });
    await admin.save();

    res.json({ msg: "Banco de dados instalado com sucesso" });
  } catch (error) {
    res.status(500).json({ msg: "Erro na instalação", error });
  }
});

module.exports = router;

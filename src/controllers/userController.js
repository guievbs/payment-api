const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");

dotenv.config();

// Função para gerar token JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

// Registrar um novo usuário
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Verificar se o usuário já existe
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "Usuário já cadastrado" });
    }

    // Criar o novo usuário
    const user = await User.create({ name, email, password });

    // Retornar a resposta com o token JWT
    return res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user.id),
    });
  } catch (error) {
    res.status(500).json({ message: "Erro ao registrar usuário", error });
  }
};

// Login do usuário
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      return res.json({
        _id: user.id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user.id),
      });
    } else {
      return res.status(401).json({ message: "Credenciais inválidas" });
    }
  } catch (error) {
    res.status(500).json({ message: "Erro ao realizar login", error });
  }
};

module.exports = {
  registerUser,
  loginUser,
};

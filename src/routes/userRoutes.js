const express = require("express");
const router = express.Router();
const { registerUser, loginUser } = require("../controllers/userController");

// Rota para registro de usuário
router.post("/register", registerUser);

// Rota para login de usuário
router.post("/login", loginUser);

module.exports = router;

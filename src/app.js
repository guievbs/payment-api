const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("src/config/db");
const userRoutes = require("src/routes/userRoutes");

dotenv.config();

connectDB();

const app = express();

// Middleware para parsing de JSON
app.use(express.json());

// Rotas de usuário
app.use("/api/users", userRoutes);

module.exports = app;

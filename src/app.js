const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");

dotenv.config();

connectDB();

const app = express();

// Middleware para parsing de JSON
app.use(express.json());

// Rotas de usuário
app.use("/api/users", userRoutes);

module.exports = app;

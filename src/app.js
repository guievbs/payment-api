const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");

dotenv.config();

connectDB();

const app = express();

// Middleware para parsing de JSON
app.use(express.json());

// Configurações do Swagger
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Payment API",
      version: "1.0.0",
      description: "API de pagamento online",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ["./routes/*.js"], // Caminho para os arquivos de rotas onde as anotações Swagger estão localizadas
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);

// Rota GET /docs para servir a documentação Swagger
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Rotas de usuário
app.use("/api/users", userRoutes);

module.exports = app;

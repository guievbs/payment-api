const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const transactionController = require("../controllers/transactionController");

/**
 * @swagger
 * tags:
 *   name: Transactions
 *   description: Gerenciamento de transações
 */

/**
 * @swagger
 * /api/transactions:
 *   get:
 *     summary: Retorna a lista de transações
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           enum: [5, 10, 30]
 *           default: 5
 *         description: Número de registros por página
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Página a ser exibida
 *     responses:
 *       200:
 *         description: Lista de transações
 *       401:
 *         description: Não autorizado
 */
router.get("/", authMiddleware, transactionController.getAll);

/**
 * @swagger
 * /api/transactions:
 *   post:
 *     summary: Cria uma nova transação
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - amount
 *               - description
 *             properties:
 *               amount:
 *                 type: number
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Transação criada com sucesso
 *       400:
 *         description: Dados inválidos
 */
router.post("/", authMiddleware, transactionController.create);

module.exports = router;

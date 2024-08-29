const express = require("express");
const router = express.Router();
const {
  createAccount,
  getAccounts,
  updateAccount,
  deleteAccount,
} = require("../controllers/accountController");
const authMiddleware = require("../middleware/authMiddleware");

/**
 * @swagger
 * components:
 *   schemas:
 *     Account:
 *       type: object
 *       required:
 *         - name
 *         - balance
 *       properties:
 *         id:
 *           type: string
 *           description: ID auto-gerado da conta
 *         name:
 *           type: string
 *           description: Nome da conta
 *         balance:
 *           type: number
 *           description: Saldo da conta
 *       example:
 *         id: d5fE_asz
 *         name: Conta Corrente
 *         balance: 1000.00
 */

/**
 * @swagger
 * tags:
 *   name: Accounts
 *   description: Gerenciamento de contas
 */

/**
 * @swagger
 * /api/accounts:
 *   post:
 *     summary: Cria uma nova conta
 *     tags: [Accounts]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Account'
 *     responses:
 *       201:
 *         description: Conta criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Account'
 */
router.post("/", authMiddleware, createAccount);

/**
 * @swagger
 * /api/accounts:
 *   get:
 *     summary: Retorna a lista de contas
 *     tags: [Accounts]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de contas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Account'
 */
router.get("/", authMiddleware, getAccounts);

/**
 * @swagger
 * /api/accounts/{id}:
 *   put:
 *     summary: Atualiza uma conta existente
 *     tags: [Accounts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID da conta
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Account'
 *     responses:
 *       200:
 *         description: Conta atualizada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Account'
 */
router.put("/:id", authMiddleware, updateAccount);

/**
 * @swagger
 * /api/accounts/{id}:
 *   delete:
 *     summary: Exclui uma conta existente
 *     tags: [Accounts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID da conta
 *     responses:
 *       200:
 *         description: Conta excluída com sucesso
 */
router.delete("/:id", authMiddleware, deleteAccount);

module.exports = router;

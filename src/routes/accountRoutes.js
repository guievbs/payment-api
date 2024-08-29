const express = require("express");
const router = express.Router();
const {
  createAccount,
  getAccounts,
  updateAccount,
  deleteAccount,
} = require("../controllers/accountController");
const authMiddleware = require("../middleware/authMiddleware");

// Rotas de contas
router.post("/", authMiddleware, createAccount);
router.get("/", authMiddleware, getAccounts);
router.put("/:id", authMiddleware, updateAccount);
router.delete("/:id", authMiddleware, deleteAccount);

module.exports = router;

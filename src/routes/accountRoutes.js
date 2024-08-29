const express = require("express");
const {
  getAccounts,
  createAccount,
  updateAccount,
  deleteAccount,
} = require("../controllers/accountController");
const { protect, admin } = require("../middleware/authMiddleware");
const router = express.Router();

router.route("/").get(protect, getAccounts).post(protect, admin, createAccount);

router
  .route("/:id")
  .put(protect, admin, updateAccount)
  .delete(protect, admin, deleteAccount);

module.exports = router;

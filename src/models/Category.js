const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  transactions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Transaction" }],
});

const Category = mongoose.model("Category", CategorySchema);

module.exports = Category;

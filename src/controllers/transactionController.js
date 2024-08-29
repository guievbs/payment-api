const Transaction = require("../models/Transaction");

// Função para listar todas as transações
exports.getAll = async (req, res) => {
  try {
    const { limit = 5, page = 1 } = req.query;
    const transactions = await Transaction.find()
      .limit(parseInt(limit))
      .skip((page - 1) * limit);
    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar transações" });
  }
};

// Função para criar uma nova transação
exports.create = async (req, res) => {
  try {
    const { amount, description } = req.body;
    const transaction = new Transaction({ amount, description });
    await transaction.save();
    res.status(201).json(transaction);
  } catch (error) {
    res.status(400).json({ message: "Erro ao criar transação" });
  }
};

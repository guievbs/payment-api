const Account = require("../models/Account");

exports.createAccount = async (req, res) => {
  try {
    const account = new Account({ user: req.user.id, ...req.body });
    await account.save();
    res.status(201).json(account);
  } catch (error) {
    res.status(500).json({ msg: "Erro ao criar conta", error });
  }
};

exports.getAccounts = async (req, res) => {
  try {
    const accounts = await Account.find({ user: req.user.id })
      .limit(req.query.limit)
      .skip(req.query.page * req.query.limit);
    res.json(accounts);
  } catch (error) {
    res.status(500).json({ msg: "Erro ao buscar contas", error });
  }
};

exports.updateAccount = async (req, res) => {
  try {
    const account = await Account.findById(req.params.id);
    if (!account) return res.status(404).json({ msg: "Conta não encontrada" });

    if (account.user.toString() !== req.user.id)
      return res.status(403).json({ msg: "Acesso negado" });

    account.name = req.body.name || account.name;
    account.balance = req.body.balance || account.balance;
    await account.save();
    res.json(account);
  } catch (error) {
    res.status(500).json({ msg: "Erro ao atualizar conta", error });
  }
};

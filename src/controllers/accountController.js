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

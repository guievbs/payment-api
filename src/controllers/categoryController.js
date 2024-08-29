// src/controllers/categoryController.js
const Category = require("../models/Category");

exports.createCategory = async (req, res) => {
  try {
    const category = new Category(req.body);
    await category.save();
    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ msg: "Erro ao criar categoria", error });
  }
};

exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find()
      .limit(req.query.limit)
      .skip(req.query.page * req.query.limit);
    res.json(categories);
  } catch (error) {
    res.status(500).json({ msg: "Erro ao buscar categorias", error });
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category)
      return res.status(404).json({ msg: "Categoria não encontrada" });

    category.name = req.body.name || category.name;
    await category.save();
    res.json(category);
  } catch (error) {
    res.status(500).json({ msg: "Erro ao atualizar categoria", error });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category)
      return res.status(404).json({ msg: "Categoria não encontrada" });

    await category.remove();
    res.json({ msg: "Categoria deletada com sucesso" });
  } catch (error) {
    res.status(500).json({ msg: "Erro ao deletar categoria", error });
  }
};

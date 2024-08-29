const express = require("express");
const {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/categoryController"); // Importa as funções do controller para manipular as categorias.
const { protect, admin } = require("../middleware/authMiddleware"); // Importa os middlewares de autenticação e verificação de administrador.

const router = express.Router(); // Cria um novo roteador do Express para definir as rotas.

// Define a rota para "/api/categories/":
router
  .route("/")
  // GET: Permite que qualquer usuário autenticado obtenha a lista de categorias.
  .get(protect, getCategories)
  // POST: Permite que apenas um administrador crie uma nova categoria.
  .post(protect, admin, createCategory);

// Define a rota para "/api/categories/:id", onde ":id" é o identificador da categoria:
router
  .route("/:id")
  // PUT: Permite que apenas um administrador atualize uma categoria específica.
  .put(protect, admin, updateCategory)
  // DELETE: Permite que apenas um administrador exclua uma categoria específica.
  .delete(protect, admin, deleteCategory);

module.exports = router; // Exporta o roteador para que possa ser usado em outros arquivos.

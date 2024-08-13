const { Router } = require("express");
const categoriesRouter = Router();
const categoriesController = require("../controllers/categoriesController");

categoriesRouter.get("/", categoriesController.getAllCategories);
categoriesRouter.delete("/:id", categoriesController.deleteCategory);
categoriesRouter.get("/:id", categoriesController.getCategoryItems);

module.exports = categoriesRouter;

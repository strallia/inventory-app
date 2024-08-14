const { Router } = require("express");
const categoriesRouter = Router();
const categoriesController = require("../controllers/categoriesController");

categoriesRouter.get("/", categoriesController.getAllCategories);
categoriesRouter.get("/new", categoriesController.getAddCategoryForm);
categoriesRouter.post("/new", categoriesController.postAddCategory);
categoriesRouter.get("/:id/update", categoriesController.getUpdateCategoryForm);
categoriesRouter.put("/:id/update", categoriesController.putUpdateCategory);
categoriesRouter.delete("/:id", categoriesController.deleteCategory);
categoriesRouter.get("/:id", categoriesController.getCategoryItems);

module.exports = categoriesRouter;

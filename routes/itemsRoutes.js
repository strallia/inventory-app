const { Router } = require("express");
const itemsRouter = Router();
const itemsController = require("../controllers/itemsController");

itemsRouter.get("/", itemsController.getAllItems);
itemsRouter.get("/new", itemsController.getAddItemForm);
itemsRouter.post("/new", itemsController.postAddItem);
itemsRouter.delete("/:id", itemsController.deleteItem);
itemsRouter.get("/:id/update", itemsController.getUpdateItemForm);
itemsRouter.put("/:id/update", itemsController.putUpdateItem);

module.exports = itemsRouter;

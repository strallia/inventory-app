const { Router } = require("express");
const itemsRouter = Router();
const itemsController = require("../controllers/itemsController");

itemsRouter.get("/", itemsController.getAllItems);
itemsRouter.delete("/:id", itemsController.deleteItem);
itemsRouter.get("/:id/update", itemsController.getUpdateItemForm);
itemsRouter.put("/:id/update", itemsController.putUpdateItem);

module.exports = itemsRouter;

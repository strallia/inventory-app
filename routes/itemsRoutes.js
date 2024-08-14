const { Router } = require("express");
const itemsRouter = Router();
const itemsController = require("../controllers/itemsController");

itemsRouter.get("/", itemsController.getAllItems);
itemsRouter.delete("/:id", itemsController.deleteItem);

module.exports = itemsRouter;

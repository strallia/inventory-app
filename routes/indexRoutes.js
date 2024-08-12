const { Router } = require("express");
const indexRouter = Router();

indexRouter.get("/", indexController.getHomePage);

module.exports = indexRouter;

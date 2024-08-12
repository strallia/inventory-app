const items = require("../utils/items");

const getAllItems = (req, res) => {
  res.render("items", { items });
};

module.exports = { getAllItems };

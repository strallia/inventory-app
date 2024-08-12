const categories = [
  { id: 1, name: "wheels" },
  { id: 2, name: "roller skates" },
  { id: 3, name: "brands" },
];

const getAllCategories = (req, res) => {
  res.render("allCategories", { categories });
};

module.exports = { getAllCategories };

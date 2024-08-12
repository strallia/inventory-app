const items = [
  {
    id: 1,
    categoryID: 1,
    name: "Energy wheels",
  },
  {
    id: 2,
    categoryID: 2,
    name: "Boardwalk skates",
  },
  {
    id: 3,
    categoryID: 3,
    name: "Suregrip",
  },
];

const getAllItems = (req, res) => {
  res.render("allItems", { items });
};

module.exports = { getAllItems };

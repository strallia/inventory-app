const pool = require("./pool");

const getAllCategories = async () => {
  const { rows } = await pool.query(
    "SELECT * FROM categories ORDER BY category_id"
  );
  return rows;
};

const addCategory = async (title) => {
  await pool.query("INSERT INTO categories (title) VALUES ($1)", [title]);
};

const findCategory = async (categoryID) => {
  const { rows } = await pool.query(
    "SELECT * FROM categories WHERE category_id = $1",
    [categoryID]
  );
  return rows[0];
};

const updateCategory = async (categoryID, title) => {
  await pool.query("UPDATE categories SET title = $1 WHERE category_id = $2", [
    title,
    categoryID,
  ]);
};

const deleteCategory = async (categoryID) => {
  await pool.query("DELETE FROM categories WHERE category_id = $1", [
    categoryID,
  ]);
};

const getCategoryItems = async (categoryID) => {
  const { rows } = await pool.query(
    "SELECT * FROM items WHERE category_id = $1",
    [categoryID]
  );
  return rows;
};

module.exports = {
  getAllCategories,
  addCategory,
  findCategory,
  updateCategory,
  deleteCategory,
  getCategoryItems,
};

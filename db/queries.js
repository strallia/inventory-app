const pool = require("./pool");

/**
 * Queries for categories table
 */

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

/**
 * Queries for items table
 */

const getAllItems = async () => {
  const { rows } = await pool.query("SELECT * FROM items ORDER BY item_id");
  return rows;
};

const addItem = async (title, categoryID) => {
  await pool.query("INSERT INTO items (title, category_id) VALUES ($1, $2)", [
    title,
    categoryID,
  ]);
};

const deleteItem = async (itemID) => {
  await pool.query("DELETE FROM items WHERE item_id = $1", [itemID]);
};

const findItem = async (itemID) => {
  const { rows } = await pool.query("SELECT * FROM items WHERE item_id = $1", [
    itemID,
  ]);
  return rows[0];
};

const updateItem = async (itemID, title) => {
  await pool.query("UPDATE items SET title = $1 WHERE item_id = $2", [
    title,
    itemID,
  ]);
};

module.exports = {
  getAllCategories,
  addCategory,
  findCategory,
  updateCategory,
  deleteCategory,
  getCategoryItems,
  getAllItems,
  addItem,
  deleteItem,
  findItem,
  updateItem,
};

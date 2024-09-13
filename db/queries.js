const pool = require("./pool");

/**
 * Queries for categories table
 */

const getAllCategories = async () => {
  const { rows } = await pool.query(
    "SELECT * FROM categories ORDER BY id"
  );
  return rows;
};

const addCategory = async (title) => {
  await pool.query("INSERT INTO categories (title) VALUES ($1)", [title]);
};

const findCategory = async (categoryID) => {
  const { rows } = await pool.query(
    "SELECT * FROM categories WHERE id = $1",
    [categoryID]
  );
  return rows[0];
};

const updateCategory = async (categoryID, title) => {
  await pool.query("UPDATE categories SET title = $1 WHERE id = $2", [
    title,
    categoryID,
  ]);
};

const deleteCategory = async (categoryID) => {
  try {
    await pool.query("DELETE FROM items WHERE category_id = $1", [categoryID]);
    await pool.query("DELETE FROM categories WHERE id = $1", [
      categoryID,
    ]);
  } catch (err) {
    if (err.message.includes("violates foreign key constraint")) {
      return {message: "Cannot delete category because other items depend on its items."};
    } else console.log(err);
  }
};

const itemsTableWithForeignKeysResolved =  `
  SELECT 
    items.id, 
    items.title AS item_title, 
    categories.title AS category_title,
    items2.title AS brand,
    items3.title AS stock_wheels
  FROM items
  JOIN categories ON items.category_id = categories.id
  LEFT JOIN items items2 ON items.brand_id = items2.id
  LEFT JOIN items items3 ON items.stock_wheels_id = items3.id
`;

const getCategoryItems = async (categoryID) => {
  const { rows } = await pool.query(
    `${itemsTableWithForeignKeysResolved} WHERE categories.id = $1`,
    [categoryID]
  );
  return rows;
};

/**
 * Queries for items table
 */

const getAllItems = async () => {
  const { rows } = await pool.query(
    `${itemsTableWithForeignKeysResolved} ORDER BY items.id`
  );
  return rows;
};

const addItem = async (title, categoryID, brandID, wheelsID) => {
  const optionalBrandID = brandID ? brandID : null;
  const optionalWheelsID = wheelsID ? wheelsID : null;
  await pool.query(
    `INSERT INTO items (title, category_id, brand_id, stock_wheels_id)
    VALUES ($1, $2, $3, $4)`,
    [title, categoryID, optionalBrandID, optionalWheelsID]
  );
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

const updateItem = async (itemID, title, categoryID) => {
  await pool.query(
    "UPDATE items SET title = $1, category_id = $2 WHERE item_id = $3",
    [title, categoryID, itemID]
  );
};

const getAllBrands = async () => {
  const {rows} = await pool.query(
    `SELECT items.id, items.title
    FROM items
    JOIN categories ON items.category_id = categories.id
    WHERE categories.title = 'brands'`
  );
  return rows;
};

const getAllWheels = async () => {
  const {rows} = await pool.query(
    `SELECT items.id, items.title
    FROM items
    JOIN categories ON items.category_id = categories.id
    WHERE categories.title = 'wheels'`
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
  getAllItems,
  addItem,
  deleteItem,
  findItem,
  updateItem,
  getAllBrands,
  getAllWheels
};

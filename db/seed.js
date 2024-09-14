require("dotenv").config();
const { Client } = require("pg");

const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_DATABASE } = process.env;

const SQL = `
  CREATE TABLE IF NOT EXISTS categories (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    title TEXT
  );

  INSERT INTO categories (title)
  VALUES ('brands'), ('wheels'), ('skates');

  CREATE TABLE IF NOT EXISTS items (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    category_id INTEGER REFERENCES categories(id),
    title TEXT,
    brand_id INTEGER REFERENCES items(id),
    stock_wheels_id INTEGER REFERENCES items(id)
  );

  INSERT INTO items (category_id, title, brand_id, stock_wheels_id)
  VALUES  
    (1, 'sure-grip', NULL, NULL),
    (1, 'bont', NULL, NULL),
    (1, 'moxi', NULL, NULL),
    (1, 'luminous', NULL, NULL),
    (2, 'sure-grip oasis', 1, NULL), 
    (2, 'bont glide', 2, NULL), 
    (2, 'moxi classic', 3, NULL),
    (3, 'sure-grip boardwalk', 1, 5),
    (3, 'bont parkstar', 2, 6),
    (3, 'moxi lolly', 3, 7);
`;

const seedDB = async () => {
  console.log("seeding database...");
  try {
    const client = new Client({
      user: DB_USER,
      password: DB_PASSWORD,
      host: DB_HOST,
      port: DB_PORT,
      database: DB_DATABASE,
    });
    await client.connect();
    await client.query(SQL);
    await client.end();
    console.log("seeding complete");
  } catch (err) {
    console.error("error seeding database", err);
  }
};
seedDB();

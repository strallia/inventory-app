require("dotenv").config();
const { Client } = require("pg");

const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_DATABASE } = process.env;

const SQL = `
  CREATE TABLE IF NOT EXISTS categories (
    category_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    title TEXT
  );

  INSERT INTO categories (title)
  VALUES ('wheels'), ('roller skates'), ('brands');

  CREATE TABLE IF NOT EXISTS items (
    item_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    category_id INTEGER REFERENCES categories (category_id),
    title TEXT
  );

  INSERT INTO items (category_id, title)
  VALUES 
    (1, 'energy wheels'), 
    (2, 'boardwalk skates'), 
    (3, 'suregrip brand');
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

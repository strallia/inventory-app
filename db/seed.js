require("dotenv").config();
const { Client } = require("pg");

const { USER, PASSWORD, HOST, PORT, DATABASE } = process.env;

const SQL = `
  CREATE TABLE IF NOT EXISTS categories (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    title TEXT
  );

  INSERT INTO categories (title)
  VALUES ('wheels'), ('roller skates'), ('brands');

  CREATE TABLE IF NOT EXISTS items (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    category_id INTEGER REFERENCES categories (id),
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
      user: USER,
      password: PASSWORD,
      host: HOST,
      port: PORT,
      database: DATABASE,
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

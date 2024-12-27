const {Client} = require('pg');

const SQL = `
CREATE TABLE IF NOT EXISTS usernames (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  username VARCHAR ( 255 ), 
  quantity INT,
  price INT,
);

INSERT INTO usernames (username, quantity, price) 
VALUES
  ('pineapple', 100, 200),
  (''),
  (''),
  ('');
`;
async function main() {
    console.log("seeding...");
    const client = new Client({
      connectionString: "postgresql://OluchiEze:mesh4199@localhost:5432/top_users",
    });
    await client.connect();
    await client.query(SQL);
    await client.end();
    console.log("done");
  }
  
  main();
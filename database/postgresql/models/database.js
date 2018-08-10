const pg = require('pg');
const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/restaurantData';

const client = new pg.Client(connectionString);
client.connect();
const query = client.query(
  'CREATE TABLE items(id SERIAL PRIMARY KEY, text VARCHAR(40) not null, complete BOOLEAN)');
await client.connect();
var res = await client.query("SELECT * FROM json_test");
res.rows.forEach(row => {
  console.log(row);
});
await client.end();
});
const { Pool } = require("pg");

const connectionString = process.env.URL;
console.log("pool=>" + connectionString);
const pool = new Pool({
  connectionString,
});

pool.connect((err, pool) => {
  if (err) {
    console.log("err", err);
    console.error("client didn't connect", err.message, err.stack);
    return;
  }

  console.log("pool connected on " + pool.user);
});
const CreateTable = () => {
  pool
    .query(
      `CREATE TABLE courses (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    image TEXT,
    teacher_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    FOREIGN KEY (teacher_id) REFERENCES users (user_id) ON DELETE CASCADE
);`
    )
    .then((result) => {
      console.log(result);
    })
    .catch((err) => {
      console.log(err);
    });
};
// CreateTable()
module.exports = { pool };

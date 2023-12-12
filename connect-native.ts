import * as mysql from "mysql2";

const connection = mysql.createConnection({
  host: "localhost",
  user: "sergio",
  password: "12345",
  database: "cursodb",
  port: 4500,
});

connection.query(
  "insert into product (name) values ('product05');",
  (err, results, fields) => {
    if (err) {
      console.error(err.message);
    } else {
      console.log(results);
    }
  }
);

connection.query("select * from product", (err, results, fields) => {
  if (err) {
    console.error(err.message);
  } else {
    console.log(results);
  }
});

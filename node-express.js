const mysql = require("mysql");
const express = require("express");
const app = express();

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Astics",
  database: "mysql"
});

app.get("/", (req, res) => {
  try {
    con.connect();
    console.log("Connected!");
    var sql =
      "CREATE TABLE rishabhjitani1 (name VARCHAR(255), address VARCHAR(255))";
    try {
      con.query(sql);
      console.log("Table created");
      res.send("Table created successfully");
    } catch (e) {
      console.log(e);
      res.send("Error in creating the table");
    }
  } catch (e) {
    console.log(e);
  }
});

app.listen(3002, () => console.log("Example app listening on port 3002!"));

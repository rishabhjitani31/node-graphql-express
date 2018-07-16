import mysql from "mysql";
import { rejects } from "assert";
import { resolve } from "path";
const express = require("express");
const app = express();

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Astics",
  database: "mysql"
});
con.connect();

app.get("/", (req, res) => {
  var sql =
    "CREATE TABLE rishabhjitani123456 (name VARCHAR(255), address VARCHAR(255))";
  try {
    con.query(sql);
    console.log("Table created");
    res.send("Table created successfully");
  } catch (e) {
    console.log(e);
    res.send("Error in creating the table");
  }
});

app.get("/insert", (req, res) => {
  var sql =
    "INSERT INTO rishabhjitani123456 (name, address) VALUES ('Astics','S.G Highway')";
  try {
    con.query(sql);
    console.log("Entery added successfully");
    res.send("Entry added succesfully in the table ");
  } catch (e) {
    console.log(e);
    res.send("Error in adding the records");
  }
});

app.get("/list", async (req, res) => {
  var sql = "SELECT * FROM rishabhjitani123456";
  try {
    const result = await new Promise((resolve, reject) => {
      con.query(sql, (err, resp) => {
        if (err) reject(err);
        resolve(resp);
      });
    });

    console.log("response", result);
    res.send(result);
  } catch (e) {
    console.log(e);
    res.send("Error in listing  the records");
  }
});

app.get("/deleteitems", (req, res) => {
  var sql = "DELETE  FROM rishabhjitani123456 where name = 'Astics'";
  try {
    con.query(sql);
    res.send("records deleted successfully");
  } catch (e) {
    console.log(e);
    res.send("Error in deleting  the records");
  }
});

app.get("/deletetable", (req, res) => {
  var sql = "DROP table rishabhjitani";
  try {
    con.query(sql);
    res.send("Table deleted successfully");
  } catch (e) {
    console.log(e);
    res.send("Error in deleting  the table");
  }
});

app.get("/updatetable", (req, res) => {
  var sql =
    "UPDATE TABLE rishabhjitani123456 SET name = 'Crest Data Systems' where name = 'Crest'";
  try {
    con.query(sql);
    res.send("Table details updated successfully");
  } catch (e) {
    console.log(e);
    res.send("Error in updating the table");
  }
});

app.listen(3002, () => console.log("Example app listening on port 3002!"));

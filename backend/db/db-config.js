const express = require("express");
const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "onlineexam",
});

db.connect((err) => {
  if (err) {
    console.log("Error in  DB Connection", err.message);
    throw err;
  }
});

module.exports = db;

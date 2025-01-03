const db = require("../db/db-config");

const User = {
  createUser: (userData, callback) => {
    const sql =
      "INSERT INTO userauth (`name`, `email`, `institute`, `password`, `role`, `empId`, `image`) VALUES (?, ?, ?, ?, ?, ?, ?)";
    db.query(sql, userData, callback);
  },

  loginUser: (email, password, callback) => {
    const sql = "SELECT * FROM userauth WHERE `email` = ? AND `password` = ?";
    db.query(sql, [email, password], callback);
  },
};

module.exports = User;

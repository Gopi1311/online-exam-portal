const db = require("../db/db-config");

const Profile = {
  getProfileById: (userId, callback) => {
    const sql = "SELECT * FROM userauth WHERE id = ?";
    db.query(sql, [userId], callback);
  },
  getTeacherProfileById: (userId, callback) => {
    const sql = "SELECT * FROM userauth WHERE id = ? AND role = 'teacher'";
    db.query(sql, [userId], callback);
  },
  getNameById: (userId, callback) => {
    const sql = "SELECT name FROM userauth WHERE id = ?";
    db.query(sql, [userId], callback);
  },
};

module.exports = Profile;

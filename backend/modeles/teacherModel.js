const db = require("../db/db-config");

const Teacher = {
  // Get Student Report for All Student By Teacher
  getAllStudentReport: (teacherid, callback) => {
    const sql = `
        SELECT 
            t.id AS testId, 
            t.testname, 
            u.name AS studentname, 
            m.mark, 
            m.date,
            (SELECT COUNT(*) FROM test WHERE test.test_id = t.id) AS totalQuestions 
        FROM 
            mark m
        JOIN 
            testdetail t ON m.test_id = t.id
        JOIN 
            userauth u ON m.user_id = u.id
        WHERE 
            t.teacherid = ?
        ORDER BY 
            m.date DESC;
    `;
    db.query(sql, [teacherid], callback);
  },
};

module.exports = Teacher;

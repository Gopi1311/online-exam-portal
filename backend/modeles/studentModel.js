const db = require("../db/db-config");

const Student = {
  // Fetch student profile image by ID
  getStudentImageById: (studentId, callback) => {
    const sql = "SELECT image FROM userauth WHERE id=?";
    db.query(sql, [studentId], callback);
  },

  // All test view for student
  getAllTests: (callback) => {
    const sql = "SELECT id, testname FROM testdetail";
    db.query(sql, callback);
  },

  // Fetch questions for a specific test for Student
  getQuestionsByTestId: (testId, callback) => {
    const sql = "SELECT * FROM test WHERE test_id=?";
    db.query(sql, [testId], callback);
  },
  //UPDATE STUDENT MARKS IN TABLE
  updateMarks: (values, callback) => {
    const sql =
      "INSERT INTO mark (`user_id`, `test_id`, `mark`, `date`, `cheatingCount`) VALUES (?, ?, ?, ?, ?)";
    db.query(sql, values, callback);
  },

  // Fetch student status report
  getStatusReport: (studentId, testId, callback) => {
    const sql = `
            SELECT 
                t.testname, 
                m.mark, 
                m.date 
            FROM 
                mark m 
            JOIN 
                testdetail t 
            ON 
                m.test_id = t.id 
            WHERE 
                m.user_id = ? AND m.test_id = ?`;
    db.query(sql, [studentId, testId], callback);
  },

  // Fetch marks for all tests taken by a student
  getStudentMarks: (studentId, callback) => {
    const sql = `
            SELECT 
                td.testname, 
                m.mark, 
                m.date, 
                (SELECT COUNT(*) FROM test q WHERE q.test_id = td.id) AS totalQuestions 
            FROM 
                mark m  
            JOIN 
                testdetail td ON m.test_id = td.id
            WHERE 
                m.user_id = ?
            ORDER BY 
                m.date DESC;
            `;
    db.query(sql, [studentId], callback);
  },
};

module.exports = Student;

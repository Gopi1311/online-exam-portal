const db = require("../db/db-config");

const Test = {
  // Save the test details (test name and teacher ID)
  saveTestDetails: (testname, teacherid, callback) => {
    const sql = "INSERT INTO testdetail (testname, teacherid) VALUES (?, ?)";
    db.query(sql, [testname, teacherid], (err, result) => {
      if (err) {
        return callback(err, null);
      }
      callback(null, result.insertId);
    });
  },

  // Save the test questions
  saveTestQuestions: (questions, testId, callback) => {
    const sql =
      "INSERT INTO test (question, option1, option2, option3, option4, answer, test_id, level) VALUES ?";
    const values = questions.map((q) => [
      q.question,
      q.option1,
      q.option2,
      q.option3,
      q.option4,
      q.answer,
      testId,
      q.level,
    ]);

    db.query(sql, [values], (err, result) => {
      if (err) {
        return callback(err, null);
      }
      callback(null, result);
    });
  },

  // View All test by teacher
  getTestsByTeacher: (teacherid, callback) => {
    const sql = "SELECT id, testname FROM testdetail WHERE teacherid = ?";
    db.query(sql, [teacherid], (err, data) => {
      if (err) {
        return callback(err, null);
      }
      callback(null, data);
    });
  },

  //Veiw Particular Test By Teacher
  getQuestionsByTestId: (testId, callback) => {
    const sql = `
        SELECT t.*, td.testname 
        FROM test t
        JOIN testdetail td ON t.test_id = td.id
        WHERE t.test_id = ?
        `;
    db.query(sql, [testId], callback);
  },

  // Update test details
  updateTestDetail: (testId, testName) => {
    return new Promise((resolve, reject) => {
      const sql = "UPDATE testdetail SET `testname`=? WHERE `id`=?";
      db.query(sql, [testName, testId], (err, result) => {
        if (err) return reject(err);
        resolve(result);
      });
    });
  },

  // Update test questions
  updateQuestion: (question) => {
    return new Promise((resolve, reject) => {
      const sql = `
        UPDATE test 
        SET 
          question=?, option1=?, option2=?, option3=?, option4=?, answer=?, level=? 
        WHERE id=?
      `;
      const values = [
        question.question,
        question.option1,
        question.option2,
        question.option3,
        question.option4,
        question.answer,
        question.level,
        question.id,
      ];
      db.query(sql, values, (err, result) => {
        if (err) return reject(err);
        resolve(result);
      });
    });
  },

  //Delete Test By Id

  deleteTestById: (testId) => {
    return new Promise((resolve, reject) => {
      const sql = "DELETE FROM testdetail WHERE `id`=?";
      db.query(sql, [testId], (err, result) => {
        if (err) return reject(err);
        resolve(result);
      });
    });
  },
};

module.exports = Test;

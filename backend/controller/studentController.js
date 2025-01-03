const Student = require("../modeles/studentModel");

exports.getProfileImage = (req, res) => {
  const studentId = req.session.studentid;

  Student.getStudentImageById(studentId, (err, data) => {
    if (err) {
      console.error("Error fetching student image:", err);
      return res
        .status(500)
        .json({ error: "An error occurred while retrieving the image." });
    }

    if (data.length === 0 || !data[0].image) {
      return res.status(404).send("Image not found");
    }

    res.writeHead(200, { "Content-Type": "image/jpeg" });
    res.end(data[0].image);
  });
};

exports.studentTestView = (req, res) => {
  Student.getAllTests((err, data) => {
    if (err) {
      console.error("Error retrieving tests:", err);
      return res
        .status(500)
        .json({ error: "An error occurred while retrieving the tests." });
    }
    return res.status(200).json(data);
  });
};

exports.getQuestionStudent = (req, res) => {
  const testId = req.params.id;

  Student.getQuestionsByTestId(testId, (err, data) => {
    if (err) {
      console.error("Error retrieving questions:", err);
      return res
        .status(500)
        .json({ error: "An error occurred while retrieving the questions." });
    }

    return res.status(200).json(data);
  });
};

// mark update after test submit
exports.marksUpdate = (req, res) => {
  const user_id = req.session.studentid;
  const test_id = req.params.id;
  const { marks, cheatingCount } = req.body;
  const date = new Date();

  const values = [user_id, test_id, marks, date, cheatingCount];

  Student.updateMarks(values, (err, data) => {
    if (err) {
      console.error("Error in updating marks:", err);
      return res
        .status(500)
        .json({ error: "An error occurred while updating marks." });
    }
    return res
      .status(200)
      .json({ message: "Marks updated successfully.", data });
  });
};

//Particular test for Student
exports.getStatusReport = (req, res) => {
  const studentId = req.session.studentid;
  const testId = req.params.id;

  if (!studentId) {
    return res.status(400).json({ error: "Student ID not found in session" });
  }

  Student.getStatusReport(studentId, testId, (err, data) => {
    if (err) {
      console.error("Error fetching status report:", err);
      return res.status(500).json({ error: "Failed to fetch data for marks" });
    }
    return res.status(200).json(data);
  });
};

// Get student marks for all tests
exports.getStudentMarks = (req, res) => {
  const studentId = req.session.studentid;

  if (!studentId) {
    return res.status(400).json({ error: "Student ID not found in session" });
  }

  Student.getStudentMarks(studentId, (err, data) => {
    if (err) {
      console.error("Error fetching student marks:", err);
      return res.status(500).json({ error: "Failed to fetch student marks" });
    }
    return res.status(200).json(data);
  });
};

const Test = require("../modeles/testModel");

// Save a test (both test details and questions)
exports.saveTest = (req, res) => {
  const { testname, questions } = req.body;
  const teacherid = req.session.teacherid;

  if (!teacherid) {
    return res.status(401).send("Unauthorized. Please login.");
  }

  // Save test details
  Test.saveTestDetails(testname, teacherid, (err, testId) => {
    if (err) {
      console.log("Error saving test details:", err);
      return res.status(500).json({ error: err.message });
    }

    // Save test questions
    Test.saveTestQuestions(questions, testId, (err, data) => {
      if (err) {
        console.log("Error saving test questions:", err);
        return res.status(500).json({ error: err.message });
      }

      return res.status(200).json({ message: "Test added successfully", data });
    });
  });
};

// view all test by teacher
exports.viewTest = (req, res) => {
  const teacherid = req.session.teacherid;

  if (!teacherid) {
    return res.status(404).json("unauthorized. please login.");
  }

  Test.getTestsByTeacher(teacherid, (err, data) => {
    if (err) {
      console.log("Error retrieving tests:", err);
      return res.status(500).json({ error: err.message });
    }

    return res.status(200).json(data);
  });
};

exports.ParticularTest = (req, res) => {
  const testId = req.params.id;

  Test.getQuestionsByTestId(testId, (err, data) => {
    if (err) {
      console.error("Error retrieving questions:", err);
      return res.status(500).json({ error: err.message });
    }
    return res.status(200).json(data);
  });
};

exports.updateTest = async (req, res) => {
  const testId = req.params.id;
  const { testname, questions } = req.body;

  try {
    // Update test details
    await Test.updateTestDetail(testId, testname);

    // Update test questions
    const updatePromises = questions.map((q) => Test.updateQuestion(q));
    const updateResults = await Promise.all(updatePromises);

    res
      .status(200)
      .json({ message: "Test updated successfully", data: updateResults });
  } catch (err) {
    console.error("Error updating test:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.deleteTest = async (req, res) => {
  const testId = req.params.id;

  try {
    await Test.deleteTestById(testId);
    res.status(200).json({ message: "Test deleted successfully" });
  } catch (err) {
    console.error("Error deleting test:", err);
    res.status(500).json({ error: err.message });
  }
};

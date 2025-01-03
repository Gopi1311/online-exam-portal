const Teacher = require("../modeles/teacherModel");

exports.getAllTestReport = (req, res) => {
  const teacherid = req.session.teacherid;

  if (!teacherid) {
    return res
      .status(401)
      .json({ error: "Unauthorized: Teacher ID not found in session." });
  }

  Teacher.getAllStudentReport(teacherid, (err, data) => {
    if (err) {
      console.error("Error in teacher get report:", err);
      return res.status(500).json({ error: err.message });
    }
    return res.status(200).json({
      message: "Marks retrieved by teacher successfully",
      report: data,
    });
  });
};

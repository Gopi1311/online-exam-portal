const Profile = require("../modeles/userProfileModel");
exports.getUserProfile = (req, res) => {
  const userId = req.session.profileid;
  const role = req.session.role;

  if (!userId || !role) {
    return res
      .status(400)
      .json({ error: "User ID or role is missing in the session" });
  }

  console.log(`User ID: ${userId}, Role: ${role}`);

  if (role === "teacher") {
    // Fetch teacher profile data
    Profile.getTeacherProfileById(userId, (err, result) => {
      if (err) {
        console.error("Database error:", err);
        return res
          .status(500)
          .json({ error: "Failed to retrieve teacher profile data" });
      }

      if (result.length === 0) {
        return res.status(404).json({ error: "Teacher not found" });
      }

      return res.status(200).json(result[0]);
    });
  } else if (role === "student") {
    // Fetch student profile data
    Profile.getProfileById(userId, (err, result) => {
      if (err) {
        console.error("Database error:", err);
        return res
          .status(500)
          .json({ error: "Failed to retrieve student profile data" });
      }

      if (result.length === 0) {
        return res.status(404).json({ error: "Student not found" });
      }

      return res.status(200).json(result[0]);
    });
  } else {
    return res.status(400).json({ error: "Invalid role" });
  }
};

exports.getNameTag = (req, res) => {
  const userId = req.session.profileid;

  if (!userId) {
    return res.status(400).json({ error: "User not logged in" });
  }

  Profile.getNameById(userId, (err, data) => {
    if (err) {
      console.error("Error fetching teacher name:", err);
      return res.status(500).json({ error: "Error fetching teacher name" });
    }

    if (data.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.json(data);
  });
};

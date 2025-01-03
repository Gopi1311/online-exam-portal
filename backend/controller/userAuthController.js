const User = require("../modeles/userAuthModel");

exports.signup = (req, res) => {
  const { name, email, institute, password, role, empid } = req.body;
  const image = req.file?.buffer;

  if (!name || !email || !institute || !password || !role) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const userData = [name, email, institute, password, role, empid, image];

  User.createUser(userData, (err, result) => {
    if (err) {
      console.error("Error inserting user data:", err);
      return res.status(500).json({ error: err.message });
    }
    return res
      .status(201)
      .json({ message: "Signup successful", userId: result.insertId });
  });
};

exports.login = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  User.loginUser(email, password, (err, data) => {
    if (err) {
      console.error("Error querying data:", err);
      return res.status(500).json({ error: err.message });
    }

    if (data.length > 0) {
      const user = data[0];

      // Set session variables
      req.session.name = user.name;
      req.session.profileid = user.id;
      req.session.role = user.role;
      if (user.role === "student") {
        req.session.studentid = user.id;
        console.log("Student logged in:", req.session.name);
        return res.json({ message: "Student" });
      } else if (user.role === "teacher") {
        req.session.teacherid = user.id;
        console.log("Teacher logged in:", req.session.name);
        return res.json({ message: "Teacher" });
      } else {
        return res.status(400).json({ message: "Invalid role" });
      }
    } else {
      return res.status(401).json({ message: "Invalid email or password" });
    }
  });
};

exports.logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Error during logout:", err);
      return res.status(500).send("Error logging out");
    }

    res.clearCookie("connect.sid"); // Clear the session cookie
    return res.status(200).send("Logged out");
  });
};

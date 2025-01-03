const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const userAuthRouter = require("./router/userAuthRouter");
const studentRouter = require("./router/studentRouter");
const teacherRouter = require("./router/teacherRouter");
const testRouter = require("./router/testRouter");
const userProfileRouter = require("./router/userProfileRouter");
const app = express();
app.use(bodyParser.json());
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    method: ["POST", "GET", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);

app.use("/auth", userAuthRouter);
app.use("/teacher", teacherRouter);
app.use("/student", studentRouter);
app.use("/test", testRouter);
app.use("/user", userProfileRouter);

const PORT = process.env.PORT || 8081;

app.listen(PORT, () => {
  console.log("Server running on port :", PORT);
});

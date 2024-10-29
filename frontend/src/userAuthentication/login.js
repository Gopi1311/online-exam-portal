import React, { useState} from "react";
import Loginvalidation from "./loginValidation";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import NavBar from "../homeDashBoard/NavBar";

function Login() {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState({});
  const handleInput = (event) => {
    setValues((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  

  const handleSubmit = (event) => {
    event.preventDefault();
    setError(Loginvalidation(values));
    if (error.email === "" && error.password === "") {
      axios
        .post("http://localhost:8081/login", values)
        .then((res) => {
          console.log(res.data.message)
          if (res.data.message.toLowerCase()  === "student") {
            navigate("/studenthomedash");
          }
         else if (res.data.message.toLowerCase() === "teacher") {
            navigate("/teacherhomedash");
          }
          else {
            alert("E-mail or Password is incorrect");
          }
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div>
      {/* <NavBar/> */}
       <div className="d-flex justify-content-center align-items-center  vh-100" style={{backgroundColor:'#7da0ca'}}> 
   
      <div className="bg-white p-3 rounded w-25">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3 ">
            <label htmlFor="email">
              <strong>E-mail</strong>
            </label>
            <input
              type="email"
              placeholder="Enter Email"
              className="form-control rounded-0"
              name="email"
              onChange={handleInput}
            />
            {error.email && <span className="text-danger">{error.email}</span>}
          </div>
          <div className="mb-3 ">
            <label htmlFor="pass">
              <strong>Password</strong>
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              className="form-control rounded-0"
              name="password"
              onChange={handleInput}
            />
            {error.password && (
              <span className="text-danger">{error.password}</span>
            )}
          </div>
         
          <button type="submit" className="btn btn-success w-100">
            Login
          </button>
          <Link
            to="/studentsignup"
            className="btn  btn-secondary w-100 mt-3"  
          >
            Register Account
          </Link>
        </form>
      </div>
    </div>
    </div>
   
  );
}

export default Login;

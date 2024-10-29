import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Signupvalidation from "./signupValidation";

import Axios from "axios";
function TeacherSignup() {
  const [values, setValues] = useState({
    name: "",
    empid: "",
    institute:"",
    email: "",
    password: "",
    role:"teacher"
  });

  const [error, setError] = useState({});
  const handleInput = (event) => {
    setValues((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };
  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    setError(Signupvalidation(values));
    if (error.name === "" && error.email === "" && error.password === "" && error.institute === "") {
      Axios.post("http://localhost:8081/Signup", values)
        .then((res) => {
          navigate("/login");
        })
        .catch((err) => console.log(err));
    }
  };
  return (
    <div className="d-flex justify-content-center align-items-center  vh-100"style={{backgroundColor:'#7da0ca'}}>
      <div className="bg-white p-3 rounded w-25">
        <h2>
          TeacherSign-up<span className="fs-6 text-danger"> or </span>
          <Link
            to="/studentsignup"
            className="btn  btn-sm text-success me-2 text-decoration-underline fw-bold fs-6"
          >
            Student
          </Link>
        </h2>
        <form action="" onSubmit={handleSubmit}>
          <div className="mb-3 ">
            <label htmlFor="Name">
              <strong>UserName</strong>
            </label>
            <input
              type="text"
              placeholder="Enter UserName"
              className="form-control rounded-0"
              name="name"
              onChange={handleInput}
            />
            {error.name && <span className="text-danger">{error.name}</span>}
          </div>
          <div className="mb-3 ">
            <label htmlFor="empid">
              <strong>EmployeeID</strong>
            </label>
            <input
              type="text"
              placeholder="Enter EmployeeID"
              className="form-control rounded-0"
              name="empid"
              onChange={handleInput}
            />
            {error.name && <span className="text-danger">{error.name}</span>}
          </div>

          <div className="mb-3 ">
                <label htmlFor="institute"><strong>InstituteName</strong></label>
                <input type='text' placeholder='Enter InstituteName'className='form-control rounded-0' name='institute' onChange={handleInput} />
                {error.institute && <span className="text-danger">{error.institute}</span>}
            </div>

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

          <p className="p mt-3">
            <label>
              <input
                type="checkbox"
                required
                className="form-check-input me-3 "
              />
              I agree to the terms and conditions.
            </label>
          </p>
          <button type="submit" className="btn btn-success w-100">
            Signup
          </button>

          <Link to="/login" className="btn  btn-secondary w-100 mt-3">
            Login
          </Link>
        </form>
      </div>
    </div>
  );
}

export default TeacherSignup;

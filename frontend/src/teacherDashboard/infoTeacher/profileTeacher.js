import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
const ProfileTeacher = () => {
  axios.defaults.withCredentials = true;

  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:8081/user/profile`)
      .then((res) => {
        setProfiles(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div
      className="d-flex vh-100  justify-content-center align-items-center"
      style={{ backgroundColor: "#c1e8ff" }}
    >
      <div className="w-25 bg-white rounded p-3 shadow-lg">
        <h2 className="border-bottom pb-2 d-flex justify-content-center">
          Teacher Detail
        </h2>
        <h6 className="mt-2">EmpID:</h6>
        <p className="border-bottom pb-2">{profiles.empid}</p>
        <h6 className="mt-3">TeacherName:</h6>
        <p className="border-bottom pb-2">{profiles.name}</p>
        <h6 className="mt-3">E-mailId:</h6>
        <p className="border-bottom pb-2">{profiles.email}</p>
        <h6 className="mt-3">InstituteName:</h6>
        <p className="border-bottom pb-2">{profiles.institute}</p>

        <Link to="/teacherhomedash" className="btn btn-primary ">
          Back
        </Link>
      </div>
    </div>
  );
};

export default ProfileTeacher;

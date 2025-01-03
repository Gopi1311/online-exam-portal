import React, { useState } from "react";
import NavBarStudent from "./sidenavBarStudent";
import HomecontentStudent from "./homecontentStudent";
import axios from "axios";

const StudentHomeDash = () => {
  axios.defaults.withCredentials = true;
  const [toggle, setToggle] = useState(true);

  const Toggle = () => {
    setToggle(!toggle);
  };

  return (
    <div
      className="container-fluid  min-vh-100"
      style={{ backgroundColor: "#7da0ca" }}
    >
      <div className="row ">
        {toggle && (
          <div
            className="col-4 col-md-2  vh-100 "
            style={{ backgroundColor: "#c1e8ff" }}
          >
            <NavBarStudent />
          </div>
        )}
        <div className={`col ${toggle ? "col-md-10" : "col-md-12"} p-0`}>
          <HomecontentStudent Toggle={Toggle} />
        </div>
      </div>
    </div>
  );
};

export default StudentHomeDash;

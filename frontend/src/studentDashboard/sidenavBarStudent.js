import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import axios from "axios";
import "./studentSidebar.css";

const NavBarStudent = () => {

  const navigate=useNavigate();

  const handleLogout = () => {
    axios.get('http://localhost:8081/logout')
      .then((response) => {
        if (response.status === 200) {
          console.log('Logged out successfully');
          navigate('/login');
        }
      })
      .catch((error) => {
        console.log('Error logging out:', error);
      });
  };

  return (
    <div className=" sidebar">
      
      <div className="m-2 ">
        <i className="bi bi-sourceforge me-2 fs-4"></i>
        <span className="brand-name fs-4">Student</span>
      </div>
      <hr className="text-dark" />
      <div className="  list-group list-group-flush">
        <Link to='/' className="list-group-item py-2 rounded sidelink">
          <i className="bi bi-house fs-5 me-3"></i>
          <span >Home</span>
        </Link>
       
        <Link to='/reportstudent' className="list-group-item py-2 rounded sidelink">
          <i className="bi bi-clipboard-data fs-5 me-3"></i>
          <span >Report</span>
        </Link>
      
        <Link to='/profilestudent' className="list-group-item py-2 rounded sidelink">
          <i className="bi bi-person fs-5 me-3"></i>
          <span >Profile</span>
        </Link>
         <button onClick={handleLogout} className="list-group-item py-2 rounded btn  sidelink">
          <i className="bi bi-power fs-5 me-3"></i>
          <span style={{marginRight:'100px'}}>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default NavBarStudent;
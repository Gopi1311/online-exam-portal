import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Link } from 'react-router-dom'
import { FaBookAtlas } from "react-icons/fa6";
import './navbar.css'

const NavBar = () => {
  return (
   
    <div className="d-flex  justify-content-center py-2 shadow-sm fs-2 fw-bold"style={{backgroundColor: '#5483b3'}} >
      <div className='book-icon ms-4 me-2 '>
      <FaBookAtlas />
      </div>
    <div className="flex-grow-1 text-center fs-2 fw-bold ms-2">
        Online Examination System
      </div>
     <div className="nav-link ms-auto">
        <Link to="/" className="btn  btn-sm me-2 text-decoration-underline fw-bold fs-6">home</Link>
        <Link to="/login" className="btn  btn-sm me-2 text-decoration-underline fw-bold fs-6" >Login</Link>
        <Link to="/studentsignup" className="btn  btn-sm me-2 text-decoration-underline fw-bold fs-6">Register</Link>
        <Link to="/aboutus" className="btn  btn-sm me-2 text-decoration-underline fw-bold fs-6">Aboutus</Link>
    </div>
    </div>
   
  )
}

export default NavBar

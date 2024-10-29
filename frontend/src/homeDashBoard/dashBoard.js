import React from 'react'
import NavBar from './NavBar';

const DashBoard = () => {
  return (
    <div className="dash-home cont " style={{backgroundColor: '#c1e8ff', minHeight: '100vh',width: '100%', height: '100vh'}}>
      <div>
      <NavBar/>
      </div>
   <div >
   <h1 className=" d-flex vh-100 justify-content-center align-items-center fs-1 "style={{ marginTop: '-10%',color:'#181d2c'}}>Welcome to Online Examation System</h1>
    </div>   
   
   </div>
   
   
  )
}

export default DashBoard;

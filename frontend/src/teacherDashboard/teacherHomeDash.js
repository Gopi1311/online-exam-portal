import React, { useState } from "react";
import NavBarTeacher from "./sidenavBarTeacher";
import Homecontentteacher from "./homecontentteacher";

const TeacherHomeDash = () => {
 
  const [toggle,setToggle]=useState(true);
  const Toggle = ()=>{
    setToggle(!toggle)
  }
  return (
    <div className="container-fluid  min-vh-100" style={{backgroundColor:'#7da0ca'}}>
     
      <div className="row">
      {toggle &&  <div className="col-4 col-md-2 vh-100" style={{backgroundColor:'#c1e8ff'}}>
          <NavBarTeacher />
        </div>}
       

        <div className="col p-0">
          <Homecontentteacher Toggle={Toggle}/>
        </div>
      </div>
    </div>
  );
};

export default TeacherHomeDash;

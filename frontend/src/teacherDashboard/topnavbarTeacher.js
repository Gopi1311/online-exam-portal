import React, { useEffect, useState } from "react";
import 'bootstrap/js/dist/dropdown'
import 'bootstrap/js/dist/collapse'
import axios from "axios";

const TopNav = ({Toggle}) => {

  const [name,setName]=useState();
  useEffect(()=>{
    axios.get('http://localhost:8081/teachernametag')
    .then((res)=>{
      setName(res.data[0].name);
    })
    .catch((err)=>{
      console.log('error in name showing:',err);
    })
  },[])
  return (
    <nav className="navbar navbar-expand-sm navbar-white  px-3  "style={{backgroundColor:'#052659',color:'#c1e8ff'}} >
      <i className="navbar-brand bi bi-justify-left fs-4 text-white" onClick={Toggle}></i>
      <h2 >Teacher DashBoard</h2>
    <div className="ml-auto" style={{position: 'absolute', right: '20px', display: 'flex', alignItems: 'center'}}>
        <i className="  bi bi-person-circle" style={{ paddingRight: '10px', fontSize: '2rem' }}></i>
        <h4 className="mb-0 text-white" style={{ borderBottom: '2px solid #c1e8ff', paddingBottom: '3px' }}>{name}</h4>
      </div>
    </nav>
  );
};

export default TopNav;

import React, {useState, useEffect } from 'react'
import TopNav from "./topnavbarTeacher";
import {Link} from "react-router-dom"
import axios from 'axios';
import './homeContentTeacher.css';
const Homecontentteacher = ({Toggle}) => {

const [tests,setTests]=useState([]);

useEffect(()=>{
  const Testcard=async()=>{
   await axios.get('http://localhost:8081/testview')
    .then((res)=>{
      setTests(res.data)
    })
    .catch((err)=>{
      console.log(err)
    })
  }

  Testcard();
 
},[])

const handleDelete=async(testId)=>{
  await axios.delete(`http://localhost:8081/deletetest/${testId}`)
  .then((res)=>{
    setTests(tests.filter(test=>test.id!==testId))
  })
  .catch((err)=>{
    console.log("Error deleting test:",err)
  })
}

  return (
    <div >
      <TopNav Toggle={Toggle}/>

      {
        tests.length>0 ? (
          <div className="container-fluid">
          <div className="row g-3 my-2">
            {tests.map((test)=>(
               
                 <div className="col-md-3  p-2 bg-white shadow-sm d-flex justify-content-around align-items-center rounded mx-3" key={test.id}>
                   <div>
                   <Link to={`/viewtestteacher/${test.id}`}  className="  text-decoration-none text-dark">
                     <h3 className="fs-2 testcard ">{`${test.id}. ${test.testname}`}</h3>
                     </Link>
                   </div>
                   <i className="bi bi-box-arrow-up-right p-3 fs-1"></i>
                   <button className="btn btn-danger" onClick={()=>handleDelete(test.id)}>Delete</button>
               </div>
               
             
            ))}
           
          
          </div>
        </div>
        ):(
          <div className="notest card d-flex justify-content-center align-items-center mt-5 ms-5 " style={{ height: '200px', width: '200px'}}>
          <i className="plus bi bi-plus-lg " style={{ fontSize: '4rem'}}></i>
      </div>
      
         
        )
      }
      
    </div>
  )
}

export default Homecontentteacher

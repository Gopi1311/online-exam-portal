import React, {useState, useEffect } from 'react'
import TopNavStudent from './topnavbarStudent';
import {Link} from "react-router-dom"
import axios from 'axios';
import './homeContentStudent.css';
const HomecontentStudent = ({Toggle}) => {

const [tests,setTests]=useState([]);
const [filterTest,setFilterTest]=useState();
axios.defaults.withCredentials = true;
useEffect(()=>{
  const Testcard=async()=>{
   await axios.get('http://localhost:8081/studenttestview')
    .then((res)=>{
      setTests(res.data)
      setFilterTest(res.data)
    })
    .catch((err)=>{
      console.log(err)
    })
  }

  Testcard();
 
},[])



const handleSearch =(e)=>{
  const searchTest=e.target.value.toLowerCase();
  const filterTest=tests.filter((test)=> test.testname.toLowerCase().includes(searchTest));
  setFilterTest(filterTest);
}

  return (
    <div className='w-100 'style={{minHeight: '100vh',width: '100%', height: '100vh',overflow: 'hidden'}}>
      <TopNavStudent Toggle={Toggle}/>
      <div className="d-flex  vh-100  justify-content-center align-items-start  ">
    <div className="container-fluid   p-4 shadow-sm "style={{backgroundColor:'#7da0ca'}} > 
    <div className="row">
    <div className="col">

      <div className="mb-3">
          <input
            type="text"
            placeholder="🔍 Search Text Here.."
            onChange={handleSearch}
            className="form-control w-25 fs-5 "
          />
      </div>
      {tests.length > 0 ? (
        <table className="table table-striped table-hover rounded overflow-hidden">
          <thead className="theadt bg-primary" >
            <tr >
              <th scope="col">S.No</th>
              <th scope="col">TestName</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {filterTest.map((test,index) => (
             
              <tr key={test.id}>
                <td>{index+1}</td>
                <td>{test.testname}</td>
                <td>
                <Link
                  
                  to={`/faceauth/${test.id}`}
                    className="btn btn-primary btn-sm me-2"
                  >
                   Take Test
                  </Link>
                <Link
                   to={`/statusstudent/${test.id}`}
                    className="btn btn-info text-white btn-sm me-2"
                  >
                   Status
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <h2>No Test Available</h2>
      )}
    </div>
    </div>
    </div>
    </div>
    </div>
  )
}

export default HomecontentStudent



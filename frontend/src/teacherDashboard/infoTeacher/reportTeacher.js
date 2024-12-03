import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

const ReportTeacher = () => {
  const [reportData, setReportData] = useState([]);

  useEffect(() => {
        axios.get('http://localhost:8081/getTeacherReport')
        .then((res)=>{
          setReportData(res.data.report); 
        })
       
       .catch((err)=>{
        console.error("Error fetching report data:", err);
       })
  }, []);

  const getPercentageColor=(percentage)=>{
    if(percentage>=80){
      return 'green'; 
    }
    else if(percentage>=60){
      return 'orange'
    }
    else{
      return 'red';
    }
  }

  const getSkillMessage=(percentage)=>{
    if(percentage>=80){
      return 'Excellent ';
    }
    else if(percentage>=60){
      return 'Good ,keep learning';
    }
    else{
      return 'Need to improve your Skill';
    }
  }

  const navigate=useNavigate();
  const handleBackButtonClick = () => {
    navigate('/teacherhomedash')
};


  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Test Report for All Students</h1>
      <div className="card rounded overflow-hidden">
        <div className="card-body"  style={{backgroundColor:'#7da0ca'}}>
       <div className='table-responsive'>
       <table className="table table-striped table-bordered table-hover rounded overflow-hidden">
        <thead className="thead-dark">
          <tr>
          <th scope="col">S.No</th>
            <th scope="col">Student Name</th>
            <th scope="col">Test Name</th>
            <th scope="col">Marks</th>
            <th scope="col">Student Level</th>
            <th scope="col">cheatingCount</th>
            <th scope="col">Date</th>
           
          </tr>
        </thead>
        <tbody>
          {reportData.length > 0 ? (
            reportData.map((data, index) => {
              const percentage = ((data.mark / data.totalQuestions) * 100).toFixed(2);
              return(
              <tr key={index}>
                <td>{index+1}</td>
                <td>{data.studentname}</td>
                <td>{data.testname}</td>
                <td>{data.mark}</td>
                <td className='fw-bold' style={{color: getPercentageColor(percentage)}}>{percentage}% - {getSkillMessage(percentage)}</td>
                <td>{data.cheatingCount}</td>
                <td>{new Date(data.date).toLocaleDateString()}</td> 
                
              </tr>
              )
})
          ) : (
            <tr>
              <td colSpan="4" className="text-center">No report data available.</td>
            </tr>
          )}
        </tbody>
      </table>
       </div>
       <button className="btn btn-secondary mt-3" onClick={handleBackButtonClick}>
          Go Back
        </button>
        </div>
      </div>
    </div>
  );
};

export default ReportTeacher;

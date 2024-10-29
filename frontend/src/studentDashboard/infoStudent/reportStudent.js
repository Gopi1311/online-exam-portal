
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import {useNavigate} from 'react-router-dom';
 

const ReportStudent = () => {
  const [marks, setMarks] = useState([]);
 
  useEffect(() => {
    const fetchMarks = async () => {
      try {
        const response = await axios.get('http://localhost:8081/studentmarks');
        setMarks(response.data);
        console.log(response.data);
      } catch (error) {
        console.log('Error fetching marks:', error);
      }
    };

    fetchMarks();
  }, []);

  const getPercentageColor = (percentage) => {
    if (percentage >= 80) {
      return 'green';
    } else if (percentage >= 60) {
      return 'orange';
    } else {
      return 'red';
    }
  };

  const getSkillMessage = (percentage) => {
    if (percentage >= 80) {
      return 'Excellent';
    } else if (percentage >= 60) {
      return 'Good, keep learning';
    } else {
      return 'Need to improve your skills';
    }
  };
  const navigate = useNavigate();

  const handleBackButtonClick = () => {
      navigate('/studenthomedash')
  };

  return (
   
      <div className="container mt-4">
    <div className="card rounded overflow-hidden">
      <div className="card-body" style={{backgroundColor:'#7da0ca'}}>
      <h2 className="text-center mb-4">Test Marks</h2>
        <div className="table-responsive">
          <table className="table table-bordered table-hover table-striped rounded overflow-hidden">
            <thead className="thead-light">
              <tr>
                <th scope="col">S.No</th>
                <th scope="col">Test Name</th>
                <th scope="col">Mark</th>
                <th scope="col">Percentage Level</th>
                <th scope="col">Date</th>
              </tr>
            </thead>
            <tbody>
              {marks.map((mark, index) => {
                const percentage = ((mark.mark / mark.totalQuestions) * 100).toFixed(2);
                return (
                  <tr key={`${mark.test_id}-${index}`}>
                    <td>{index + 1}</td>
                    <td>{mark.testname}</td>
                    <td>{mark.mark}</td>
                    <td className='fw-bold' style={{ color: getPercentageColor(percentage) }}>
                      {percentage}% - {getSkillMessage(percentage)}
                    </td>
                    <td>{new Date(mark.date).toLocaleDateString()}</td>
                  </tr>
                );
              })}
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

export default ReportStudent;

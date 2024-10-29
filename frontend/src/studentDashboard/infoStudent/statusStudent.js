
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const StatusStudent = () => {
  const [testResults, setTestResults] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchResult = async () => {
      await axios.get(`http://localhost:8081/statusReportStudent/${id}`)
        .then((res) => {
          setTestResults(res.data);
        })
        .catch(error => {
          console.error('Error fetching test results:', error);
        });
    };

    fetchResult();
  }, [id]);

  const handleBackButtonClick = () => {
    navigate('/studenthomedash');
  };

  return (
    <div className="container mt-4">
     
      <div className="card">
        <div className="card-body rounded overflow-hidden" style={{backgroundColor:'#7da0ca'}}>
          <div className="table-responsive">
          <h2 className="text-center mb-4">Test Results</h2>
            <table className="table table-bordered table-hover table-striped rounded overflow-hidden">
              <thead className="thead-light">
                <tr>
                  <th scope="col">S.No</th>
                  <th scope="col">Test Name</th>
                  <th scope="col">Marks</th>
                  <th scope="col">Date</th>
                </tr>
              </thead>
              <tbody>
                {testResults.length > 0 ? (
                  testResults.map((result, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{result.testname}</td>
                      <td>{result.mark}</td>
                      <td>{new Date(result.date).toLocaleDateString()}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center">No test results found</td>
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

export default StatusStudent;

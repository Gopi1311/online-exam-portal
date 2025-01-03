import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate, useParams } from "react-router-dom";
const ExamInstructions = () => {
  const { id } = useParams();
  const [isAgreed, setIsAgreed] = useState(false);
  const navigate = useNavigate();

  const handleAgreeChange = (e) => {
    setIsAgreed(!isAgreed);
  };

  const Taketests = () => {
    navigate(`/taketest/${id}`);
  };

  return (
    <div className="container my-5">
      <h1 className="text-center mb-4">Online Quiz Instructions</h1>
      <div className="card shadow-lg">
        <div className="card-body">
          <h2 className="card-title mb-4">Before You Start</h2>
          <ul className="list-group mb-4">
            <li className="list-group-item">
              The quiz consists of 10 multiple-choice questions.
            </li>
            <li className="list-group-item">
              Each question has a time limit of 1 minute.
            </li>
            <li className="list-group-item">
              Ensure you have a stable internet connection throughout the quiz.
            </li>
            <li className="list-group-item">
              Webcam analysis will be active during the quiz to monitor the
              exam.
            </li>
            <li className="list-group-item">
              Avoid switching tabs or minimizing the browser window, as it may
              lead to disqualification.
            </li>
            <li className="list-group-item">
              Once you start the quiz, you cannot pause or go back to previous
              questions.
            </li>
            <li className="list-group-item">
              Make sure your webcam is enabled and working properly before
              starting.
            </li>
            <li className="list-group-item">
              If any suspicious activity is detected, the system may flag the
              test for review.
            </li>
          </ul>

          <div className="mb-4">
            <h3 className="mb-3">Test Overview:</h3>
            <ul className="list-group">
              <li className="list-group-item">
                Number of Questions: <strong>10</strong>
              </li>
              <li className="list-group-item">
                Time Limit: <strong>1 minute per question</strong>
              </li>
              <li className="list-group-item">
                Total Time: <strong>10 minutes</strong>
              </li>
              <li className="list-group-item">
                Webcam: <strong>Required</strong>
              </li>
            </ul>
          </div>

          <div className="form-check mb-3">
            <input
              className="form-check-input"
              type="checkbox"
              id="agreeCheck"
              checked={isAgreed}
              onChange={handleAgreeChange}
            />
            <label className="form-check-label" htmlFor="agreeCheck">
              I agree to the terms and conditions
            </label>
          </div>

          <div className="d-grid gap-2">
            <button
              className="btn btn-primary btn-lg"
              disabled={!isAgreed}
              onClick={Taketests}
            >
              Start Test
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExamInstructions;


import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './TakeTest.css'; 

const TakeTest = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [questions, setQuestions] = useState({
    easy: [],
    intermediate: [],
    hard: []
  });
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [marks, setMarks] = useState(0);
  const [questionNumber, setQuestionNumber] = useState(0);
  const [currentDifficulty, setCurrentDifficulty] = useState('easy');
  const intervalRef = useRef(null);
  const [totalQuestions, setTotalQuestions] = useState(0);

  const [timer, setTimer] = useState(0);
  const TIME_LIMIT = 60;

  const handleSelect = (option) => {
    setSelectedOption(option);
  };

  const getNextQuestion = useCallback((isCorrect) => {
    let nextDifficulty;

    if (isCorrect) {
      switch (currentDifficulty) {
        case 'easy':
          nextDifficulty = 'intermediate';
          break;
        case 'intermediate':
          nextDifficulty = 'hard';
          break;
        case 'hard':
          nextDifficulty = 'hard';
          break;
        default:
          nextDifficulty = 'easy';
      }
    } else {
      switch (currentDifficulty) {
        case 'hard':
          nextDifficulty = 'intermediate';
          break;
        case 'intermediate':
          nextDifficulty = 'easy';
          break;
        case 'easy':
          nextDifficulty = 'easy';
          break;
        default:
          nextDifficulty = 'easy';
      }
    }

    if (questions[nextDifficulty].length > 0) {
      const nextQuestion = questions[nextDifficulty].shift();
      setQuestions(prev => ({
        ...prev,
        [nextDifficulty]: [...prev[nextDifficulty]]
      }));
      setCurrentDifficulty(nextDifficulty);
      return nextQuestion;
    }
    const allQuestions = [...questions.easy, ...questions.intermediate, ...questions.hard];
    if (allQuestions.length > 0) {
      const nextQuestion = allQuestions.shift();
      setQuestions({
        easy: allQuestions.filter(q => q.level === -1),
        intermediate: allQuestions.filter(q => q.level === 0),
        hard: allQuestions.filter(q => q.level === 1)
      });
      setCurrentDifficulty(getDifficultyString(nextQuestion.level));
      return nextQuestion;
    }

    return null;
  }, [questions, currentDifficulty]);

  const handleNext = useCallback(() => {
    const isCorrect = selectedOption === currentQuestion?.answer;
    let updatedMarks = marks;

    if (isCorrect) {
      updatedMarks += 1;
      setMarks(updatedMarks);
    }
   
    const nextQuestion = getNextQuestion(isCorrect);
    if (nextQuestion) {
      setCurrentQuestion(nextQuestion);
      setSelectedOption(null);
      setTimer(0);
      setQuestionNumber(prevNumber => prevNumber + 1);
    } else {
      clearInterval(intervalRef.current);
      submitMarks(updatedMarks);
    }
  }, [marks, selectedOption, currentQuestion, getNextQuestion]);

  const submitMarks = async (finalMarks) => {
    try {
      const res = await axios.post(`http://localhost:8081/marksupdate/${id}`, { marks: finalMarks });
      console.log("Marks successfully updated: ", res.data);
      navigate('/studenthomedash');
    } catch (err) {
      console.log("Error while posting marks: ", err);
    }
  };

  const getDifficultyString = (level) => {
    switch (level) {
      case -1: return 'easy';
      case 0: return 'intermediate';
      case 1: return 'hard';
      default: return 'easy';
    }
  };

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await axios.get(`http://localhost:8081/getQuestionStudent/${id}`);
        const fetchedQuestions = {
          easy: res.data.filter(q => q.level === -1),
          intermediate: res.data.filter(q => q.level === 0),
          hard: res.data.filter(q => q.level === 1)
        };
        setQuestions(fetchedQuestions);
        setTotalQuestions((res.data.length))
       
        const firstQuestion = fetchedQuestions.easy.shift();
        if (firstQuestion) {
          setCurrentQuestion(firstQuestion);
          setQuestionNumber(1);
          setCurrentDifficulty('easy');
        }
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };

    fetchQuestions();
  }, [id]);

  useEffect(() => {
    if (timer >= TIME_LIMIT) {
      handleNext();
    }
  }, [timer, handleNext]);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setTimer(prev => prev + 1);
    }, 1000);
    return () => clearInterval(intervalRef.current);
  }, [currentQuestion]);

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="text-center mb-4">
            <h1 className="display-4">Take Your Test</h1>
            <p className="lead">Answer the following questions to the best of your ability.</p>
          </div>

          {currentQuestion && (
            <>
              <div className="progress mb-4">
                <div
                  className="progress-bar"
                  role="progressbar"
                  style={{ width: `${(questionNumber / totalQuestions) * 100}%`, backgroundColor: 'green' }}
                  aria-valuenow={questionNumber}
                  aria-valuemin="0"
                  aria-valuemax="100"
                >
                  {Math.round((questionNumber / totalQuestions) * 100)}%
                </div>
              </div>

              <div className="card shadow-lg border-0 rounded">
                <div className="card-body">
                  <h4 className="card-title mb-4">Question {questionNumber}/{totalQuestions} (Difficulty: {currentDifficulty})</h4>
                  <h5 className='bi bi-alarm-fill' style={{ color: 'green', position: 'absolute', right: '40px', top: '15px' }} >
                    <strong>:{TIME_LIMIT - timer}</strong>
                  </h5>
                  <p className="card-text fs-5">{currentQuestion.question}</p>

                  <ul className="list-unstyled">
                    {['option1', 'option2', 'option3', 'option4'].map((opt, index) => (
                      <li className="mb-3" key={index}>
                        <div className="form-check custom-radio">
                          <input
                            className="form-check-input "
                            type="radio"
                            name={`options-${questionNumber}`}
                            value={currentQuestion[opt]}
                            id={opt}
                            checked={selectedOption === currentQuestion[opt]}
                            onChange={() => handleSelect(currentQuestion[opt])}
                          />
                          <label className="form-check-label" htmlFor={opt}>
                            {currentQuestion[opt]}
                          </label>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="card-footer text-end">
                  <button
                    className="btn btn-success btn-lg"
                    onClick={handleNext}
                    disabled={!selectedOption}
                  >
                    {/* Next */}
                    {questionNumber === totalQuestions ? "Finish" : "Next"}
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default TakeTest;
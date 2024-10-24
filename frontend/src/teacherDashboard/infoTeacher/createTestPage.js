
import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate,Link } from 'react-router-dom';
const CreateTestPage = () => {
    const userQuestion = { question: "", option1: "", option2: "", option3: "", option4: "", answer: "", level:""};
    const [questions, setQuestions] = useState([userQuestion]);
    const [testname, setTestname] = useState(""); 
    const navigate=useNavigate();
    axios.defaults.withCredentials = true;
    const addQuestion = () => {
        setQuestions([...questions, userQuestion]);
    };

    const handleQuestion = (e, index) => {
        const updatedQuestions = questions.map((question, i) => 
            index === i ? { ...question, [e.target.name]: e.target.value } : question
        );
        setQuestions(updatedQuestions);
    };

    const handleTestName = (e) => {
        setTestname(e.target.value); 
    };

    const handleSubmit = async(e) => {
            e.preventDefault()

            const data = {
                testname,
                questions
            };

            await  axios.post('http://localhost:8081/savetest',data)
            .then((res)=>{
                navigate('/teacherhomedash')
            })
            .catch((err)=>{
                console.log(err)
            })

    }

    const removeQuestion = (index,e) => {
            e.preventDefault();
            const filterQuestion=[...questions];
            if (filterQuestion.length > 1) {
                filterQuestion.splice(index, 1);
                setQuestions(filterQuestion);
            }
    }


    return (
        <div className="container mt-5 d-flex justify-content-center mb-3">
            <div className="card shadow-lg p-4 bg-light w-100">
                <h1 className="text-center">Add Test</h1>
                <div className="card-body">
                  <form onSubmit={handleSubmit}>
                    <div className="mb-5">
                        <label htmlFor="testName" className="form-label"><strong>Test Name</strong></label>
                        <input
                            type="text"
                            id="testName"
                            name="testName"
                            placeholder="Enter the Test Name"
                            className="form-control"
                            value={testname}
                            onChange={handleTestName}
                        />
                    </div>
                    {questions.map((question, index) => (
                        <div key={index}>
                            <div className="mb-3">
                                <label htmlFor={`question${index + 1}`} className="form-label">
                                    <strong style={{marginRight:'65rem'}}>Question {index + 1}</strong><button className="  btn bi-trash btn-danger btn-sm "  onClick={(e)=>removeQuestion(index,e)}>Delete</button>
                                </label>
                                <input
                                    type="text"
                                    id={`question${index + 1}`}
                                    name="question"
                                    placeholder="Enter a Question"
                                    className="form-control"
                                    value={question.question}
                                    onChange={(e) => handleQuestion(e, index)}
                                />
                                
                            </div>
                            <div className="mb-3">
                                <label htmlFor={`option1_${index}`} className="form-label"><strong>Option 1</strong></label>
                                <input
                                    type="text"
                                    id={`option1_${index}`}
                                    name="option1"
                                    placeholder="Enter an Option"
                                    className="form-control"
                                    value={question.option1}
                                    onChange={(e) => handleQuestion(e, index)}
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor={`option2_${index}`} className="form-label"><strong>Option 2</strong></label>
                                <input
                                    type="text"
                                    id={`option2_${index}`}
                                    name="option2"
                                    placeholder="Enter an Option"
                                    className="form-control"
                                    value={question.option2}
                                    onChange={(e) => handleQuestion(e, index)}
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor={`option3_${index}`} className="form-label"><strong>Option 3</strong></label>
                                <input
                                    type="text"
                                    id={`option3_${index}`}
                                    name="option3"
                                    placeholder="Enter an Option"
                                    className="form-control"
                                    value={question.option3}
                                    onChange={(e) => handleQuestion(e, index)}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor={`option4_${index}`} className="form-label"><strong>Option 4</strong></label>
                                <input
                                    type="text"
                                    id={`option4_${index}`}
                                    name="option4"
                                    placeholder="Enter an Option"
                                    className="form-control"
                                    value={question.option4}
                                    onChange={(e) => handleQuestion(e, index)}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor={`answer_${index}`} className="form-label"><strong>Answer</strong></label>
                                <input
                                    type="text"
                                    id={`answer_${index}`}
                                    name="answer"
                                    placeholder="Enter the Correct Answer"
                                    className="form-control"
                                    value={question.answer}
                                    onChange={(e) => handleQuestion(e, index)}
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor={`level_${index}`} className="form-label"><strong>Level</strong></label>
                                <select
                                  
                                    id={`level_${index}`}
                                    name="level"
                                    className="form-control"
                                    value={question.level}
                                    onChange={(e) => handleQuestion(e, index)}
                                >
                                   
                                    <option value="-1" >Easy</option>
                                    <option value="0">Intermediate</option>
                                    <option value="1">Hard</option>
                                </select>
                            </div>

                            <hr className="shadow-lg"/>
                        </div>
                        
                    ))}

                    <div>
                        <button type="button" className="btn btn-primary mt-3 me-2" onClick={addQuestion}>Add Question</button>
                    </div>
                    <Link to='/teacherhomedash'  className="btn btn-danger mt-3 w-25 me-1"> cancel</Link>
                    <button type="submit" className="btn btn-success mt-3 w-25" >Save</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreateTestPage;

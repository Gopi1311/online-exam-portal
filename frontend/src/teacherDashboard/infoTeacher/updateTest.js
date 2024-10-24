
import axios from 'axios';
import React, { useState,useEffect} from 'react';
import { useNavigate,Link, useParams } from 'react-router-dom';
const UpdateTest = () => {
 
   const [testname, setTestname] = useState(""); 
    const [exists,setExists]=useState([]);
    const navigate=useNavigate();
    const {id}=useParams();
    


    const handleQuestion = (e, index,isNewQuestion=false) => {
   
        
        const updatedExists = exists.map((question, i) => 
            index === i ? { ...question, [e.target.name]: e.target.value } : question
        );
        setExists(updatedExists);
  
    };

    const handleTestName = (e) => {
        setTestname(e.target.value); 
    };

    const handleSubmit = async(e) => {
            e.preventDefault()
            const data = {
                testname,
                questions:[...exists]
            };

            await  axios.put(`http://localhost:8081/updatetest/${id}`,data)
            .then((res)=>{
                console.log(res.data)
                navigate('/teacherhomedash')
            })
            .catch((err)=>{
                console.log(err)
            })

    }


    useEffect(() => {
      const fetchQuestions = async () => {
          
           await axios.get(`http://localhost:8081/getQuestions/${id}`)
             .then((res)=>{
              setExists(res.data);
              setTestname(res.data[0]?.testname||"")
              console.log(res.data)
             })
           .catch ((error)=>{
              console.error("Error fetching questions:", error);
           }) 
              
        
      };

      fetchQuestions();
  }, [id]);

  

    return (
        <div className="container mt-5 d-flex justify-content-center mb-3">
            <div className="card shadow-lg p-4 bg-light w-100">
                <h1 className="text-center">UpdateTest</h1>
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

                
                    {exists.map((exist, index) => (
                        <div key={index}>
                            <div className="mb-3">
                                <label htmlFor={`question${index + 1}`} className="form-label">
                                    <strong style={{marginRight:'28rem'}}>Question {index + 1}</strong>
                                </label>
                                <input
                                    type="text"
                                    id={`question${index + 1}`}
                                    name="question"
                                    placeholder="Enter a Question"
                                    className="form-control"
                                    value={exist.question}
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
                                    value={exist.option1}
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
                                    value={exist.option2}
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
                                    value={exist.option3}
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
                                    value={exist.option4}
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
                                    value={exist.answer}
                                    onChange={(e) => handleQuestion(e, index)}
                                />
                            </div>
                            <div className="mb-3">
                                    <label htmlFor={`level_${index}`} className="form-label"><strong>Level</strong></label>
                                    <select
                                        id={`level_${index}`}
                                        name="level"
                                        className="form-control"
                                        value={exist.level}
                                        onChange={(e) => handleQuestion(e, index)}
                                    >
                                        <option value="-1">Easy</option>
                                        <option value="0">Intermediate</option>
                                        <option value="1">Hard</option>
                                    </select>
                                </div>
                            <hr className="shadow-lg"/>
                        </div>
                        
                    ))}

                    <Link to='/teacherhomedash'  className="btn btn-danger mt-3 w-25 me-1" > cancel</Link>
                    <button type="submit" className="btn btn-success mt-3 w-25" >Update</button>
            </form>
                </div>
            </div>
        </div>
    );
};

export default UpdateTest;

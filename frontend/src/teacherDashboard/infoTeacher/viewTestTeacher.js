import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ViewTestTeacher = () => {
    const { id } = useParams(); 
    const [questions, setQuestions] = useState([]);
   

    useEffect(() => {
        const fetchQuestions = async () => {
            
             await axios.get(`http://localhost:8081/getQuestions/${id}`)
               .then((res)=>{
                setQuestions(res.data);
                console.log(res.data)
               })
             .catch ((error)=>{
                console.error("Error fetching questions:", error);
             }) 
                
          
        };

        fetchQuestions();
    }, [id]);

    return (
        <div className="container d-flex justify-content-center flex-column my-5 ">
            <div className="card shadow-lg text-dark w-100 align-items-center bg-light">
                <div>
                <h1 className="mt-3  mb-4 text-danger text-decoration-underline" >Test View</h1>
                <Link to={`/updatetest/${questions[0]?.test_id}`} className="btn  btn-dark bi-pencil-square mb-4">Update Quiz</Link>
                </div>
                <div className="card-body">
                    <h3 className='mb-4 '>{`TestName: ${questions[0]?.testname}`}</h3>
                    {questions.map((question, index) => (
                        <div key={index}>
                            <h3>{`${index+1}.${question.question}`}</h3>
                            <h5 className="m-3">{`A.${question.option1}`}</h5>
                            <h5  className="m-3">{`B.${question.option2}`}</h5>
                            <h5  className="m-3">{`C.${question.option3}`}</h5>
                            <h5  className="m-3">{`D.${question.option4}`}</h5>
                            <h5  className="m-3">{`Answer: ${question.answer}`}</h5>
                        </div>
                    ))}
                </div>
                <Link to='/teacherhomedash' className=" btn btn-success mb-3 w-25">Back</Link>
            </div>
            
        </div>
    );
};

export default ViewTestTeacher;

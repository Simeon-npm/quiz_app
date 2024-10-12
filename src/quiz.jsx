import React from 'react'
import { useState, useEffect,  } from 'react';
import { useNavigate } from 'react-router-dom';
import ConfirmSubmit from './confirm-submit';
import { FaArrowLeft } from "react-icons/fa";
import { IoRadioButtonOff, IoRadioButtonOn } from "react-icons/io5";
import { MdKeyboardArrowDown } from "react-icons/md";
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const quiz = () => {
  const navigate = useNavigate()

  const location = useLocation()
  const outputJson = location.state.data

  const [submit, setSubmit] = useState(false) //To show the confirm submit component
  const toggleSubmit = () =>{
    setSubmit(prev=>!prev)
  }



  const [userAnswers, setUserAnswers] = useState(()=>{
    const savedAnswers = localStorage.getItem('quizAnswers');
    return savedAnswers ? JSON.parse(savedAnswers) : {};
  }); // Dynamic state for each question's answer

  useEffect(() => {
    localStorage.setItem('quizAnswers', JSON.stringify(userAnswers)); // Save the answers to localStorage
  }, [userAnswers]);

  // Function to handle answer selection
  const handleAnswerChange = (questionId, answer) => {
    setUserAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: answer // Update the selected answer for the specific question
    }));
    
    
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    
    localStorage.removeItem('quizAnswers');
    const score = checkAnswers();
    const displayScorePage = () => navigate('/score', {state: {score: score, total: outputJson.length}})
    displayScorePage()
  
  };

  // Function to check the answers
  const checkAnswers = () => {
    let score = 0;

    outputJson.forEach((question) => {
      const correctAnswerKey = Object.keys(question.correct_answers).find(
        (key) => question.correct_answers[key] === "true"
      );
      const correctAnswer = question.answers[correctAnswerKey.replace("_correct", "")];

      if (userAnswers[question.id] === correctAnswer) {
        score += 1;
        
      }

    });
      

    console.log(`Your score: ${score}/${outputJson.length}`);
    
    return score
  };


  const [slide, setSlide] = React.useState(0)
  const nextSlide = () =>{
    if (slide != outputJson.length - 1 ) {
        setSlide(prev=> prev + 1)
    }else{
        setSlide(outputJson.length - 1)
    }
    
    
  }
  const prevSlide = () =>{
    if (slide != 0) {
        setSlide(prev=> prev - 1)
    }else{
        setSlide(0)
    }
    
    
    
  }

  return (
    <div className='w-[450px] flex flex-col  relative  pt-2 bg-white h-screen'>
      {submit && <ConfirmSubmit finalSubmission={handleSubmit} backToQuestion={toggleSubmit} /> }
        <div className='flex relative items-center justify-center px-5'>
            <Link to={'/'}>
                <FaArrowLeft className='absolute left-5'/>
            </Link>
            
            <div className='text-center'>
                <h3 className='font-bold text-sm'>HTML</h3>
                <p className='text-xs'>30 Questions</p>
            </div>
        </div>

        <div className={`flex w-[450px] overflow-hidden  top-[50px] py-10`}>
            <div className={`flex`} style={{ transform: `translateX(-${slide * 450}px)` }}>
             {outputJson.map((item, index)=>(
                <div key={index} className='space-y-3 p-5 rounded-xl w-[450px]'>
                  <div className='flex justify-between'>
                    <h3 className='text-primary'>Question: {index+1 + '/' + outputJson.length}</h3>
                    <p className='text-red-700'>Quit</p>
                  </div>
                  <div className='space-y-2'>
                    <h1 className='font-bold'>{item.question}</h1>
                    <div className='space-y-2'>
                        {Object.values(item.answers).map((answer, index)=>(
                            answer != null ? (
                                <div key={index} onClick={()=>handleAnswerChange(item.id, answer)} className='flex justify-between items-center py-2 px-2 box-shadow rounded-lg hover:bg-neutral-300'>
                                    <p>{answer}</p>
                                    {userAnswers[item.id] === answer ? <IoRadioButtonOn /> : <IoRadioButtonOff />}
                                </div>
                                ) : null 
                        ))}
                    </div>

                  </div>
                  <p className=' flex items-center'>See result <MdKeyboardArrowDown /></p>
                </div>
                
             ))}
             </div>
        </div>
        <div className='flex w-full justify-end gap-3 pr-5'>
          {slide != 0 && <button onClick={()=>prevSlide()} className='px-4 py-1 text-sm bg-primary text-white rounded-lg'>Previous</button>}
          {slide != (outputJson.length-1) ? <button onClick={()=>nextSlide()} className='px-4 py-1 text-sm bg-primary text-white rounded-lg'>Next</button> : <button onClick={()=>{toggleSubmit()}} className='px-4 py-1 text-sm bg-green-500 text-white rounded-lg'>Submit</button>}
        </div>
        
    </div>
  )
}

export default quiz
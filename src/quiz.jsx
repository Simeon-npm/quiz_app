import React from 'react'
import { useState, useEffect,  } from 'react';
import { useNavigate } from 'react-router-dom';
import ConfirmSubmit from './confirm-submit';
import { FaArrowLeft } from "react-icons/fa";
import { IoRadioButtonOff, IoRadioButtonOn } from "react-icons/io5";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import Timer from './timer';

const quiz = () => {
  
  

  const width = window.screen.width > 425 ? 450 : window.screen.width
  

  const navigate = useNavigate()

  const location = useLocation()
  const outputJson = location.state.data

  

  const [submit, setSubmit] = useState(false) //To show the confirm submit component
  const toggleSubmit = () =>{
    setSubmit(prev=>!prev)
  }

  const [explanation, setExplanation] = useState(false) //To show the confirm explanation component
  const toggleExplanation = () =>{
    setExplanation(prev => !prev)
  }
  const returnToFalse = ()=>{  //prevents explanation from opening in the next or previous question
    if (explanation == true) {
      toggleExplanation()
    }
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

  const displayScorePage = () => navigate('/score', {state: {score: score, total: outputJson.length}})

  // Function to handle form submission
  const handleSubmit = (e) => {
    
    localStorage.removeItem('quizAnswers');
    const score = checkAnswers();
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
    <div className='w-[100%] sm:w-[450px]  flex flex-col  relative  pt-2 bg-white h-screen'>
      {submit && <ConfirmSubmit finalSubmission={handleSubmit} backToQuestion={toggleSubmit} /> }
        <div className='flex relative items-center justify-between px-5'>
            <Link to={'/'}>
                <FaArrowLeft />
            </Link>
            
            <div className='text-center'>
                <h3 className='font-bold text-sm'>HTML</h3>
                <p className='text-xs'>30 Questions</p>
            </div>

            <div className='font-bold'>
              <Timer endTest={displayScorePage} />
            </div>
        </div>

        <div className={`flex w-full sm:w-[450px] overflow-hidden  top-[50px] py-10`}>
            <div className={`flex`} style={{ transform: `translateX(-${slide * width}px)` }}>
             {outputJson.map((item, index)=>(
                <div key={index} style={{width: `${width}px`}} className={`space-y-3 p-5 rounded-xl  sm:w-[450px]`}>
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
                  <div className=' flex items-center' onClick={()=>toggleExplanation()} >Show Explanation {explanation ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />} </div>
                  {explanation && <div className='text-neutral-500'>
                    {item.explanation}
                  </div> }
                </div>
                
             ))}
             </div>
        </div>
        <div className='flex w-full justify-end gap-3 pr-5'>
          {slide != 0 && <button onClick={()=>{prevSlide(); returnToFalse()}} className='px-4 py-1 text-sm bg-primary text-white rounded-lg'>Previous</button>}
          {slide != (outputJson.length-1) ? <button onClick={()=>{nextSlide(); returnToFalse()}} className='px-4 py-1 text-sm bg-primary text-white rounded-lg'>Next</button> : <button onClick={()=>{toggleSubmit()}} className='px-4 py-1 text-sm bg-green-500 text-white rounded-lg'>Submit</button>}
        </div>
        
    </div>
  )
}

export default quiz
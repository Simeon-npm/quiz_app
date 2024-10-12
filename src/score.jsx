import React from 'react'
import { useLocation } from 'react-router-dom'
import { Link } from 'react-router-dom'

const score = () => {
    const location = useLocation()
    const {score, total} = location.state// Default to 0 if no score is passed
    const getRemark = (score, total) => {
        const percentage = (score / total) * 100;
      
        if (percentage >= 90) {
          return "Excellent! You nailed it.";
        } else if (percentage >= 75) {
          return "Good job! Keep it up.";
        } else if (percentage >= 50) {
          return "Fair attempt. You can do better.";
        } else {
          return "Don't give up! Try again.";
        }
    };
  return (
    <div className='w-[450px] flex flex-col gap-5 justify-center items-center  relative px-5 bg-white h-screen'>
        <div className='w-[200px] h-[200px] p-3 bg-blue-400 flex justify-center items-center rounded-full '>
            <div className='w-[100%] h-[100%] flex flex-col items-center justify-center bg-primary text-white rounded-full'>
                <p className='font-semibold text-xl'>Your Score</p>
                <h3 className='font-bold text-2xl'>{score + '/' + total}</h3>
            </div>
        </div>

        <div className='text-primary text-center'>
            <h1 className= 'font-bold text-2xl'>{getRemark(score, total)}</h1>
        </div>

        
            <Link to={'/'} className='text-white text-center bg-primary w-full py-3 hover:cursor-pointer mt-10 text-xl rounded-lg font-semibold  '>
                Back to Home
            </Link>
        

        
    </div>
  )
}

export default score
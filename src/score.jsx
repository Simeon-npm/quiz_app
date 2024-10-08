import React from 'react'
import { useLocation } from 'react-router-dom'

const score = () => {
    const location = useLocation()
    const {score, total} = location.state// Default to 0 if no score is passed
  return (
    <div className='w-[450px] flex flex-col gap-5 justify-center items-center  relative  pt-2 bg-white h-screen'>
        <div className='w-[200px] h-[200px] p-3 bg-blue-400 flex justify-center items-center rounded-full '>
            <div className='w-[100%] h-[100%] flex flex-col items-center justify-center bg-primary text-white rounded-full'>
                <p className='font-semibold text-xl'>Your Score</p>
                <h3 className='font-bold text-2xl'>{score + '/' + 5}</h3>
            </div>
        </div>

        <div className='text-primary text-center'>
            <h1 className= 'font-bold text-2xl'>Congratulation</h1>
            <p className='font-semibold '>Great job, You Did It</p>  
        </div>

        
    </div>
  )
}

export default score
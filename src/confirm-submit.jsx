import React from 'react'

const confirmSubmit = ( {finalSubmission, backToQuestion}) => {
  return (
    <div className='absolute w-[100%] z-10 flex justify-center items-center h-screen top-0 overlay'>
        <div className='bg-white p-5 rounded-lg flex flex-col gap-2'>
            <h1>Are you sure?</h1>
            <button onClick={()=>finalSubmission()} className='bg-green-500 text-white px-5 py-1 rounded'>Yes</button>
            <button onClick={()=>backToQuestion()} className='bg-red-500 text-white px-5 py-1 rounded'>No</button>
        </div>
    </div>
  )
}

export default confirmSubmit
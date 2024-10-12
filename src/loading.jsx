import React from 'react'

const loading = () => {
  return (
    <div className='uppercase font-bold bg-white w-[450px] h-screen flex justify-center items-center'>
        <div className='flex gap-5'>
            <div className='loading-animation'></div>
            <div className='loading-animation'></div>
            <div className='loading-animation'></div>
            <div className='loading-animation'></div>
        </div>
    </div>
  )
}

export default loading
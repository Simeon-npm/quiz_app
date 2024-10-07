import React from 'react'
import { Route, Router } from 'react-router-dom'
import Quiz from './quiz'

const App = () => {
  return (
    <div className='bg-blue-500 flex justify-center w-full h-screen'>
      <Quiz />
    </div>
  )
}

export default App
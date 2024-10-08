import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Quiz from './quiz'
import Score from './score'

const App = () => {
  return (
    <Router>
      <div className='bg-blue-500 flex justify-center w-full h-screen'>
        <Routes>
          <Route path='/quiz' element={<Quiz />} />
          <Route path='/score' element={<Score />} />  
        </Routes>
      </div>  
    </Router>
  )
}

export default App
import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Quiz from './quiz'
import Score from './score'
import Home from './home';
import Loading from './loading';

const App = () => {
  return (
    <Router>
      <div className='bg-blue-500 flex justify-center w-full h-screen'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/quiz' element={<Quiz />} />
          <Route path='/score' element={<Score />} />  
          <Route path='/loading' element={<Loading />} />
        </Routes>
      </div>  
    </Router>
  )
}

export default App
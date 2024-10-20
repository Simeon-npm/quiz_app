import React from 'react'
import questions from './questions'
import { FaCircleUser } from "react-icons/fa6";
import { IoDiamondOutline } from "react-icons/io5";
import { FaSearch } from "react-icons/fa";
import { stackImages } from './constants';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { getRandomQuestions } from './question_selection';



const home = () => {
    const navigate = useNavigate()
   const [isTrue, setIsTrue] = React.useState(false)

    const handleQuizPage =() =>{
        navigate('/loading')
        const outputJson = getRandomQuestions(questions, 30);
        setTimeout(()=>{
            navigate('/quiz', {state:{data: outputJson}})
        }, 3000)  
    }
    
  return (
    <div className='w-[450px] flex flex-col  relative p-3 bg-white h-screen gap-5'>
        <div className='flex items-center'>
            <FaCircleUser className='text-4xl mr-2'/>
            <div>
                <h1 className='font-bold text-sm'>User</h1>
                <p className='text-xs'>ID-1809</p>
            </div>

            <div className='ml-auto flex items-center gap-1 bg-primary text-white px-3 py-1 rounded'>
                <IoDiamondOutline />
                <p>160</p>
            </div>
        </div>

        <div >
            <div className='flex bg-neutral-200 items-center px-3 py-2 rounded-lg'>
                <input type="text" placeholder='search' className='w-full bg-neutral-200 focus:outline-none'/>
                <FaSearch />
            </div>
        </div>

        <div>
            <h1 className='font-bold text-xl mb-2'>Categories</h1>
        

            <div className='flex justify-between '>
                {stackImages.map((item, index)=>(
                    <Link key={index} to={'/quiz'}>
                        <div  className='p-3 bg-neutral-200 rounded-lg'>
                            <img src={item.image} alt="" className='w-[50px]' />
                        </div>
                        <p className='text-center uppercase text-xs font-semibold'>{item.name}</p>
                    </Link>
                    
                ))}
            </div>
        </div>

        <button onClick={()=>handleQuizPage()} className='bg-primary text-white py-2 rounded-lg font-semibold'>
            30 Random Questions
        </button>
       
    </div>
  )
}

export default home
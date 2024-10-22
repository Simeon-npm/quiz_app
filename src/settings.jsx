import React from 'react'
import { useContext } from 'react'
import { SettingContext } from './setting-context'

const settings = () => {

  const  { selected, setSelected }  = useContext(SettingContext)

  

  
  const toggleSelected = (key, value) =>{
    setSelected((prev)=>({
      ...prev,
      [key]: value
    }))
  }

  const settingsCategories =[
    {
      title: 'Time',
      stateValue: 'time',
      items: [
        {
          title: '1 Min',
          value: 1
        },
        {
          title: '3 Mins',
          value: 3
        },
        {
          title: '5 Mins',
          value: 5
        },
        {
          title: '10 Mins',
          value: 10
        },
      ]
    },
    {
    title: 'Number of Questions',
    stateValue: 'noOfQuestions',
    items: [
      {
        title: '10 ',
        value: 10
      },
      {
        title: '20',
        value: 20
      },
      {
        title: '30',
        value: 30
      },
      {
        title: '50',
        value: 50
      },
    ]
  }
  ]
  return (
    <div className='bg-white p-5 border w-full left-0 top-[50px] absolute space-y-7'>

      {settingsCategories.map((element, index)=>(
        <div key={index} className='space-y-2'>
          <h1 className='font-bold uppercase'>{element.title}</h1>
          <div className='flex justify-between'>
            {element.items.map((item, index)=>(
              <div 
              onClick={()=>toggleSelected(element.stateValue, item.value)} 
              className={`w-20 h-10 border font-semibold rounded-lg flex justify-center items-center hover:bg-neutral-100 border-black ${item.value === selected[element.stateValue] ? 'border-2 text-black': 'border-0 text-neutral-500'}`} 
              key={index}>
                {item.title}
              </div>
            ))}
          </div>
        </div>
      ))}
      
    </div>
  )
}

export default settings
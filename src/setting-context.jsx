import React, { useState, createContext } from 'react'


export const SettingContext = createContext()

export const SettingProvider =({ children }) =>{
    const [selected, setSelected] = useState({
      time: 5,
      noOfQuestions: 30,
    })

    return (
        <SettingContext.Provider value={{selected, setSelected}}>
            {children}
        </SettingContext.Provider>
    )
  } 

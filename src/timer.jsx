import React from 'react'

const timer = () => {

    const [time, setTime] = React.useState({minutes: 4, seconds: 59}) 

    
    React.useEffect(()=>{
        const timeInterval = setInterval(()=>{
            setTime((prevTime)=>{
                const {minutes, seconds} = prevTime

                if (minutes === 0 && seconds === 0) {
                    clearInterval(timeInterval)
                    return {minutes: 0, seconds: 0}
                }

                if (seconds === 0) {
                    return {minutes: minutes-1, seconds: 59}
                } else{
                    return {minutes, seconds: seconds - 1}
                }
            })
        }, 1000)

        return () => clearInterval(timeInterval)
    }, [])
    
    
  return (
    <div className='font-bold'>{time.minutes}:{time.seconds}</div>
  )
}



export default timer
import React from 'react'
import { SettingContext } from './setting-context'
import { useContext } from 'react'


const timer = ({endTest}) => {

    const {selected} = useContext(SettingContext)

    const [time, setTime] = React.useState({minutes: selected.time , seconds: 0}) 

    
    React.useEffect(()=>{
        const timeInterval = setInterval(()=>{
            setTime((prevTime)=>{
                const {minutes, seconds} = prevTime

                if (minutes == 0 && seconds == 0) {
                    clearInterval(timeInterval)
                    if(endTest) endTest()
                    return {minutes: 0, seconds: 0}
                }

                if (seconds == 0) {
                    return {minutes: minutes-1, seconds: 59}
                }
                else{
                    return {minutes, seconds: seconds - 1}
                }
            })
        }, 1000)

        return () => {
            
            clearInterval(timeInterval)
        }
    }, [])
    
    
  return (
    <div className='font-bold'>{time.minutes}:{time.seconds < 10 ? `0${time.seconds}` : time.seconds }</div>
  )
}



export default timer
import React from 'react'
import JalaliCalendar from '../calendar/JalaliCalendar'
import ShamsiDateDisplay from './date'
import DailyEventsJalaali from '../DailyEvents/DailyEventsJalaali'

export default function FullCalendar() {
    const [selectedDate, setSelectedDate] = React.useState<Boolean>(true);


 
    return (
        <div className='flex flex-col justify-center items-center cursor-pointer'>
            <div className='block ease-in-out' onClick={()=> setSelectedDate(!selectedDate)}>
                {selectedDate ?
                  <ShamsiDateDisplay />
                   
                    :
                    <JalaliCalendar />


                }


            </div>


            <DailyEventsJalaali />


        </div>
    )
}



import { useState } from 'react';
import { DateRange } from 'react-date-range';

import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file

const CalenderComponent = ({onDatesSelect}) => {
    const [showCalender, setShowCalender] = useState(false)
    const today = new Date();
const tomorrow = new Date();
tomorrow.setDate(today.getDate() + 1);

const [date, setDate] = useState([
  {
    startDate: today,
    endDate: tomorrow,
    key: 'selection'
  }
]);

    const [selectedDates, setSelectedDates] = useState(null)

    const handleSelectDates = async()=>{
      const startDate = new Date(date[0].startDate);
    const endDate = new Date(date[0].endDate);

    // Normalize time
    startDate.setHours(0, 0, 0, 0);
    endDate.setHours(0, 0, 0, 0);
        
       setSelectedDates(
      `Selected Dates: ${startDate.toDateString()} - ${endDate.toDateString()}`
    );

    setShowCalender(false);

        // Send Date objects (not strings)
    if (onDatesSelect) {
      onDatesSelect({ startDate, endDate });
    }
    }

    // const currentDate = new Date().toDateString();
    // const nextDate = new Date();
    // nextDate.setDate(nextDate.getDate()+1)

    // const formattedDate = nextDate.toDateString()

  return (
    <div className='calenderSection'>
            <div className="currentDate" onClick={()=>setShowCalender(!showCalender)}>
                {!selectedDates && (
                    <>
                     {`${new Date().toDateString()} - ${new Date(
              Date.now() + 86400000
            ).toDateString()}`}
                    </>
                )}
                {selectedDates && (
                    <div className="" style={{color:'red'}}>
                        {selectedDates}
                    </div>
                )}
            </div>

    
        {showCalender && 
         <DateRange
         editableDateInputs={true}
         onChange={item => setDate([item.selection])}
         moveRangeOnFirstSelection={false}
         ranges={date}
          minDate={new Date()}
          className='dateRange'
       />
        }
            <button onClick={handleSelectDates}
            className='calenderButton'
            >Select Dates</button>

    </div>
  )
}

export default CalenderComponent


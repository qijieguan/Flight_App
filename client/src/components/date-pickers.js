import '../styles/date-pickers.css';

import { DatePicker } from '@mui/x-date-pickers';
import { useState } from 'react';

const DatePickers = ({ setDateInput }) => {

    const [depart_date, setDepartDate] = useState("");
    const [return_date, setReturnDate] = useState("");

    return (
        <div className='date-pickers grid'>
            <div className='date-picker-wrapper flex'>
                <span>Departure</span>
                <DatePicker className='date-picker' value={depart_date} 
                    onChange={(depart_date) => { setDepartDate(depart_date); setDateInput({type: 'depart', date: depart_date.$d}); }}
                />
            </div>  
            <div className='date-picker-wrapper flex'>
                <span>Return</span>
                <DatePicker className='date-picker' value={return_date} 
                    onChange={(return_date) => { setReturnDate(return_date); setDateInput({type: 'return', date: return_date.$d}); }}
                />
            </div>  
        </div>
    )
}

export default DatePickers;
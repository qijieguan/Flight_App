import '../styles/date-pickers.css';
import { IoCalendar } from 'react-icons/io5';

import dayjs from 'dayjs';
import { DatePicker } from '@mui/x-date-pickers';
import { useState, useEffect } from 'react';

const DatePickers = ({ setDateInput }) => {

    const today = dayjs();

    const [depart_date, setDepartDate] = useState(null);
    const [return_date, setReturnDate] = useState(null);
    const [depart_string, setDepartString] = useState("");
    const [return_string, setReturnString] = useState("");
    const [showDepart, setShowDepart] = useState(false);
    const [showReturn, setShowReturn] = useState(false);

    useEffect(() => { toggleReturnDate(); }, []);
    
    const toggleReturnDate = () => {
        let return_date = document.getElementsByClassName('date-picker-wrapper')[1];
        
        if (sessionStorage.getItem('select_trip').includes('one')) { return_date?.classList.add('hide'); }
        else { return_date?.classList.remove('hide'); }
    }

    const handleSelect = (today, date, type) => {
        let date_wrapper = document.querySelector(".date-picker-wrapper." + type);

        if (type === 'depart') {
            if (return_date) {
                if ((new Date(return_date) - new Date(date)) < 0) {
                    setReturnDate(null);
                    setDateInput({type: 'return', date: null})
                }
            }
            if (date && date.$D) {
                let s = date.$d.toString().split(" ");

                if (new Date(date.$d) - new Date(today) >= 0) { 
                    date_wrapper?.classList.remove('error');

                    setDepartString(s[0] + ", " + s[1] + " " + s[2]); 
                    setShowDepart(true); 
                    setDepartDate(date);
                    setDateInput({type: 'depart', date: date.$d});
                }
                else {
                    date_wrapper?.classList.add('error');
                }
            }
        }
        else {
            if (date && date.$D) {
                let s = date.$d.toString().split(" ");
                
                if (new Date(date.$d) - new Date(today) >= 0) { 
                    date_wrapper?.classList.remove('error');

                    setReturnString(s[0] + ", " + s[1] + " " + s[2]); 
                    setShowReturn(true);
                    setReturnDate(date); 
                    setDateInput({type: 'return', date: date.$d}); 
                }
                else {
                    date_wrapper?.classList.add('error');
                }
            }
        }
    }

    const clearDateInput = (param) => {
        if (param === 'depart') {
            setShowDepart(false); 
            setDepartString(false);
            setDepartDate(null);
        }
        else {
            setShowReturn(false); 
            setReturnString(null);
            setReturnDate(null);
        }
    }

    return (
        <div className='date-pickers grid'>
            <div className='date-picker-wrapper depart flex'>
                <span>Departure Date</span>
                {!showDepart ?
                    <DatePicker className='date-picker depart' value={depart_date} 
                        minDate={today}
                        onChange={(depart_date) => { handleSelect(today,depart_date, 'depart') }}
                    /> :
                    <div className='date-selected flex'>
                        <span>{depart_string}</span>
                        <span onClick={() => { clearDateInput('depart');}}>clear</span>
                    </div>
                }
            </div>  

            <div className='icon-wrapper flex'><IoCalendar className='icon'/></div>

            <div className='date-picker-wrapper return flex'>
                <span>Return Date</span>
                {!showReturn ?
                    <DatePicker className='date-picker return' value={return_date} 
                        minDate={depart_date !== null ? depart_date : today}
                        onChange={(return_date) => { handleSelect(today, return_date, 'return') }}
                    /> :
                    <div className='date-selected flex' onClick={() => {setShowReturn(false)}}>
                        <span onClick={() => {clearDateInput('return');}}>{return_string}</span>
                    </div>
                }
            </div>  
        </div>
    )
}

export default DatePickers;
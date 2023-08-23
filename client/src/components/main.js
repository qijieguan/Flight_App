import '../styles/main.css'
import { useState } from 'react'
import axios from 'axios';

import PlacesAutocomplete from './auto-complete.js';
import DatePickers from './date-pickers.js';
import SearchResults from './search-results';

const Main = () => {

    const [originInp, setOriginInp] = useState(null);
    const [destInp, setDestInp] = useState(null);

    const [departInp, setDepartInp] = useState(null);
    const [returnInp, setReturnInp] = useState(null);

    const [flights, setFlights] = useState([]);

    const baseURL = window.location.href.includes('localhost:3000') ? 'http://localhost:3001' : "";

    const url = "https://images.pexels.com/photos/358319/pexels-photo-358319.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";
    
    const setAirportInput = (input) => {
        if (input.type === 'origin') {
            setOriginInp(input.address.split(',')[0]);
        }
        else {
            setDestInp(input.address.split(',')[0]);
        }
    }

    const setDateInput = (input) => {
        let date = null;

        if (input.date !== null) {
            date = new Date(input.date);
            date = date.getFullYear() + '-' +  ("0" + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);
        }

        if (input.type === 'depart') {
            setDepartInp(date);
        }
        else {
            setReturnInp(date);
        }
    }

    const searchFlight = async (e) => {
        e.preventDefault();

        if (!originInp || !destInp || !departInp || !returnInp) { return; }

        
        await axios.post(baseURL + '/flight/search-flight/', {
            origin: originInp.split(',')[0],
            destination: destInp.split(',')[0],
            departDate: departInp,
            returnDate: returnInp,
        })
        .then((response) => {  
            console.log(response.data);
            let results = response.data.data ? response.data.data.flights : response.data.flights;
            setFlights(results);
        } ); 
    }

    return (
        <div className="main flex">
            <div className='main-header'>
                <img src={url} alt=""/>
            </div>
            <form className='autocomplete-form grid'>
                <h1 className='flex'>Pick Two Airport Points <span>ROUND_TRIP</span></h1>
                <PlacesAutocomplete param={'origin'} setAirportInput={setAirportInput}/>
                <PlacesAutocomplete param={'destination'} setAirportInput={setAirportInput}/>
                
                <DatePickers setDateInput={setDateInput}/>
                <button className='search-button' onClick={searchFlight}>Search Flight</button>
            </form>

            <SearchResults flights={flights}/>
        </div>
    )
}

export default Main;
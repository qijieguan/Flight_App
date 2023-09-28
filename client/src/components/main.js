import '../styles/main.css'

import { useState, useEffect } from 'react'
import axios from 'axios';
import { useLocation } from 'react-router-dom';

import MainBanner from './main-banner.js';
import PlacesAutocomplete from './auto-complete.js';
import DatePickers from './date-pickers.js';
import FlightResults from './flight-results.js';
import TourPlaces from './tour-places.js';

const Main = () => {

    const [originInp, setOriginInp] = useState(null);
    const [destInp, setDestInp] = useState(null);
    const [departInp, setDepartInp] = useState(null);
    const [returnInp, setReturnInp] = useState(null);
    const [paramURL, setParamURL] = useState('');

    const [flights, setFlights] = useState([]);

    const baseURL = window.location.href.includes('localhost:3000') ? 'http://localhost:3001' : "";

    const location = useLocation();

    useEffect(() => {
        setParamURL(location.pathname);
        setFlights([]);
    }, [location]);

    const setAirportInput = (input) => {
        if (input.type === 'origin') { setOriginInp(input.address.split(',')[0]); }
        else { setDestInp(input.address.split(',')[0]); }
    }

    const setDateInput = (input) => {
        let date = null;

        if (input.date !== null) {
            date = new Date(input.date);
            date = date.getFullYear() + '-' +  ("0" + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);
        }

        if (input.type === 'depart') { setDepartInp(date); }
        else { setReturnInp(date); }
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
            <MainBanner/>            
            {!paramURL.includes('tour-places') &&
                <div>
                    <form className='autocomplete-form grid'>
                        <div className="bubble"/>
                        <div className='autocomplete-form-label flex'><h1>Pick Your Flight</h1> <span>ROUND TRIP</span></div>
                        <PlacesAutocomplete param={'origin'} setAirportInput={setAirportInput}/>
                        <PlacesAutocomplete param={'destination'} setAirportInput={setAirportInput}/>
                        
                        <DatePickers setDateInput={setDateInput}/>
                        <button className='search-button' onClick={searchFlight}>
                            <span>Search Flight</span>
                        </button>
                    </form>
                
                    <div className='important-notice'>
                        <span>*****Server is currently down. Please try again later***** </span>This is an early build based on a free version of a flight API service. 
                        Please click search button again if no results are shown (avg. wait time 5 - 30 seconds). 
                        Thank you for your patience.
                    </div>

                    <FlightResults flights={flights}/>
                </div>
            }   

            {paramURL.includes('tour-places') &&
                <TourPlaces/>
            }
        </div>
    )
}

export default Main;
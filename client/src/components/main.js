import '../styles/main.css';
import { AiOutlineSwap } from 'react-icons/ai';
import { FaCat } from 'react-icons/fa';

import { useState, useEffect } from 'react'
import axios from 'axios';
import { useLocation } from 'react-router-dom';

import PlacesAutocomplete from './places-autocomplete.js';
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
    const [message, setMessage] = useState('')

    const baseURL = window.location.href.includes('localhost:3000') ? 'http://localhost:3001' : "";
    const location = useLocation();

    useEffect(() => {
        setParamURL(location.pathname);
        setFlights([]);
        setMessage('');
    }, [location]);

    const setAirportInput = (input) => {
        if (input.type === 'origin') { setOriginInp(input.address); }
        else { setDestInp(input.address); }
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

        if (!originInp || !destInp || !departInp) { return; }
        if (sessionStorage.getItem('select_trip').includes('two') && returnInp === null) { return; }
        console.log('submited!');

        setFlights([]);
        setMessage("Fetching data... Please wait a second!");

        let request_status = document.querySelector('.request-status');
        setTimeout(() => { request_status?.scrollIntoView({block: 'start', behavior: 'smooth'}); }, 1000);

        let tripType = sessionStorage.getItem('select_trip').includes('one') ? 'ONE_WAY' : 'ROUND_TRIP';
        let classType = 
            sessionStorage.getItem('select_class').includes('prem') ? 'PREMIUM_ECONOMY' : 
            sessionStorage.getItem('select_class').toUpperCase();

        await axios.post(baseURL + '/flight/search-flight/', {
            origin: originInp.split(',')[0],
            destination: destInp.split(',')[0],
            tripType: tripType,
            classType: classType,
            departDate: departInp,
            returnDate: tripType === "ONE_WAY" ? null : returnInp,
        })
        .then((response) => {
            //console.log(response.data);
            let results = response.data.data ? response.data.data.flights : [];
            if (results.length === 0) { 
                console.log("Results are empty!");
                setMessage("Request timeout. We are sorry for the inconvenience. Please refresh the page or click search again!")
            }
            else { setMessage(""); }
            
            setFlights([...results]);
        } ); 
    }

    return (
        <div className="main flex">         
            {!paramURL.includes('tour-places') &&
                <div>
                    <form className='autocomplete-form grid'>
                        <div className='autocomplete-form-label flex'><h1>Find Live Flights</h1> <span>ROUND TRIP</span></div>
                        <div className='place-autocomplete-inputs flex'>
                            <PlacesAutocomplete param={'origin'} setAirportInput={setAirportInput}/>
                            <div className='icon-wrapper flex'>
                                <AiOutlineSwap className='icon'/>
                            </div>
                            <PlacesAutocomplete param={'destination'} setAirportInput={setAirportInput}/>
                        </div>
                        
                        <DatePickers setDateInput={setDateInput}/>
                        <button className='search-button' onClick={searchFlight}>
                            <span>Search Flight</span>
                        </button>
                    </form>
                
                    <p className='important-notice'>
                        <span>*****Server is currently down. Please try again later***** </span>This is an early build based on a free version of a flight API service. 
                        Please refresh and try again if no results are shown (avg. wait time 5 - 30 seconds). 
                        Thank you for your patience.
                    </p>

                    <FlightResults flights={flights}/>
                    { message.length > 0 && 
                        <div className='request-status flex'>
                            <FaCat className='icon'/>
                            <FaCat className='icon'/>
                            <FaCat className='icon'/>
                            <span>{message}</span>
                            <FaCat className='icon'/>
                            <FaCat className='icon'/>
                            <FaCat className='icon'/>
                        </div> 
                    }
                </div>
            }   

            {paramURL.includes('tour-places') && <TourPlaces/> }
        </div>
    )
}

export default Main;
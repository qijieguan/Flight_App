import '../styles/main.css';
import { AiOutlineSwap } from 'react-icons/ai';
import { FaCat } from 'react-icons/fa';

import { useState, useEffect } from 'react'
import axios from 'axios';
import { useLocation } from 'react-router-dom';

import LoadScreen from './loadScreen.js';
import SideNav from './side-nav.js';
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
    const [message, setMessage] = useState('');
    const [filters, setFilters] = useState(null);

    const baseURL = window.location.href.includes('localhost:3000') ? 'http://localhost:3001' : "";
    const location = useLocation();

    const url = "https://images.pexels.com/photos/2114014/pexels-photo-2114014.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";

    useEffect(() => {
        setParamURL(location.pathname);
        setFlights([]);
        setMessage('');
        setFilters(null);
        let search_button = document.querySelector('.search-button');
        search_button?.classList.remove('disabled');
        window.scrollTo(0, 0);
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

        let request_status = document.querySelector('.request-status');
        let important_notice = document.querySelector('.important-notice');
        let search_button = document.querySelector('.search-button');

        setFlights([]);
        setMessage("Fetching data... Please wait a second!");

        setTimeout(() => { important_notice?.scrollIntoView({block: 'start', behavior: 'smooth'}); }, 500);
        search_button?.classList.add('disabled');

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
            console.log(response.data);
            let results = response.data.data ? response.data.data.flights : [];
            if (results.length === 0) { 
                setMessage("Request timeout. We are sorry for the inconvenience. Please refresh the page or click search again!")
                request_status?.classList.add('stop-animate');
            }
            else { setMessage(""); request_status?.classList.remove('stop-animate');}
            search_button?.classList.remove('disabled');
            resetFilters();
            setFlights([...results]);
        } ); 
    }

    const resetFilters = () => {
        setFilters(null);

        let radios = document.querySelectorAll("[name='class-filter']");
        radios.forEach(radio => { radio.checked = false; });
    }

    const applyFilters = (filters) => { setFilters(filters); }

    return (
        <div className="main flex">     
            <div className='main-overlay'/>    
            {!paramURL.includes('tour-places') &&
                <div className='flight-search grid'>
                    <LoadScreen/>
                    <SideNav flights={flights} applyFilters={applyFilters}/>
                    <form className='autocomplete-form grid'>
                        <img src={url} className='autocomplete-form-bg' alt=""/>
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

                        <p className='important-notice'>
                            <span>*****Server is currently down. Please try again later***** </span>This is an early build based on a free version of a flight API service. 
                            Please refresh and try again if no results are shown (avg. wait time 5 - 30 seconds). 
                            Thank you for your patience.
                        </p>
                    </form>

                    {message.length > 0 && 
                        <div className='request-status wavy flex'>
                            <FaCat className='icon' style={{'--i': 1}}/>
                            <FaCat className='icon' style={{'--i': 2}}/>
                            <FaCat className='icon' style={{marginRight: '1vw',  '--i': 3}}/>
                            {message.split('').map((letter, index) => 
                                <span className={letter === ' ' ? 'space' : ' '} style={{"--i": index + 4}}>{letter}</span>
                            )}
                            <FaCat className='icon' style={{marginLeft: '1vw', '--i': message.length + 4}}/>
                            <FaCat className='icon' style={{'--i': message.length + 5}}/>
                            <FaCat className='icon' style={{'--i': message.length + 6}}/>
                        </div> 
                    }
                    <FlightResults flights={flights} filters={filters}/>
                </div>
            }   

            {paramURL.includes('tour-places') && <TourPlaces/> }
        </div>
    )
}

export default Main;
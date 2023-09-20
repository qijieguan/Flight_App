import '../styles/main.css'
import { MdOutlineCellTower } from 'react-icons/md';
import { PiMountainsFill } from 'react-icons/pi';

import { useState, useEffect } from 'react'
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';

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

    const banner_url = "https://images.pexels.com/photos/358220/pexels-photo-358220.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";
    const profile_url = "https://images.pexels.com/photos/321159/pexels-photo-321159.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";

    const location = useLocation();

    useEffect(() => {
        scrollHeaderAnimation();
        setParamURL(location.pathname);
    }, [location]);

    const scrollHeaderAnimation = () => {
        let main_banner = document.querySelector('.main-header-banner');
        let lastKnownScrollPosition = 0;
    
        setTimeout(() => {
            window.addEventListener('scroll', (e) => {
                e.preventDefault();
    
                let height = main_banner.clientHeight;
                let factor = 0.6;
                lastKnownScrollPosition = window.scrollY;

                if (main_banner.clientWidth <= 800) { factor = 0.75; }
                if (main_banner.clientWidth <= 400) { factor = 0.33; }

                if (lastKnownScrollPosition <= height * factor) {
                    main_banner.style.transform = 'translateY(-' + lastKnownScrollPosition + "px)";
                }
            });
        }, 500);
    }

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

    const handleNav = () => {
        let main_banner = document.querySelector('.main-header-banner');
        let height = main_banner.clientHeight;

        let factor = 0.6;
        
        if (main_banner.clientWidth <= 800) { factor = 0.75; }
        if (main_banner.clientWidth <= 400) { factor = 0.33; }

        window.scrollTo({top: height * factor, behavior: 'smooth'})
    }

    return (
        <div className="main flex">
            <div className='main-header-banner'>
                <img src={banner_url} alt=""/>
                <div className='main-header-overlay flex'>
                    <div className='main-header-overlay-wrapper flex'>
                        <h1>
                            <span>Hello! </span>
                            <span>Plan your trip today!</span>
                        </h1>
                        <img src={profile_url} alt=""/>
                        <div className='main-header-banner-links flex'>
                            <Link to='/'>
                                <div className='main-header-banner-link flex' onClick={() => {handleNav(); }}>
                                    <span>Realtime Flights</span>
                                    <MdOutlineCellTower className='icon'/>
                                </div>
                            </Link>

                            <Link to='/tour-places'>
                                <div className='main-header-banner-link flex'>
                                    <span>Tour Locations</span>
                                    <PiMountainsFill className='icon' style={{transform: 'translateY(-7.5%)'}}/>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
                
            </div>
            
            {!paramURL.includes('tour-places') &&
                <div>
                    <form className='autocomplete-form grid'>
                        <div className="bubble"/>
                        <div className='autocomplete-form-label flex'><h1>Choose Your Flight</h1> <span>ROUND TRIP</span></div>
                        <PlacesAutocomplete param={'origin'} setAirportInput={setAirportInput}/>
                        <PlacesAutocomplete param={'destination'} setAirportInput={setAirportInput}/>
                        
                        <DatePickers setDateInput={setDateInput}/>
                        <button className='search-button' onClick={searchFlight}>
                            <span>Search Flight</span>
                        </button>
                    </form>
                
                    <div className='important-message'>
                        ****Server is currently down. Please try again later**** This is an early build based on a free version of a flight API service. 
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
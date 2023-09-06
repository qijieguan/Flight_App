import '../styles/main.css'
import { useState, useEffect } from 'react'
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

    const banner_url = "https://images.pexels.com/photos/358220/pexels-photo-358220.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";
    const profile_url = "https://images.pexels.com/photos/321159/pexels-photo-321159.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";


    useEffect(() => {
        let main_banner = document.querySelector('.main-header-banner');
        let lastKnownScrollPosition = 0;
        let ticking = false;    

        setTimeout(() => {
            window.addEventListener('scroll', (e) => {
                e.preventDefault();
    
                let height = main_banner.clientHeight;
                let factor = 0.75;

                if (main_banner.clientWidth <= 400) { factor = 0.5 }

                lastKnownScrollPosition = window.scrollY;
                if (lastKnownScrollPosition <= height * factor) {
                    main_banner.style.transform = 'translateY(-' + lastKnownScrollPosition + "px)";
                }

                //console.log(lastKnownScrollPosition);
    
                if (!ticking) {
                    window.requestAnimationFrame(() => {
                      doSomething(lastKnownScrollPosition);
                      ticking = false;
                    });
                
                    ticking = true;
                }
            });
        }, 500)
    }, []);

    const doSomething = (scrollPos) => {

    }
    
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
            <div className='main-header-banner'>
                <img src={banner_url} alt=""/>
                <div className='main-header-overlay flex'>
                    <h1>Hello! Plan your trip today!</h1>
                    <img src={profile_url} alt=""/>
                </div>
            </div>
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
                This is an early build based on a free version of a flight API service. 
                Please click search button again if no results are shown (avg. wait time 5 - 30 seconds). 
                Thank you for your patience.
            </div>

            <SearchResults flights={flights}/>
            
        </div>
    )
}

export default Main;
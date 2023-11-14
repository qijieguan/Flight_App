import '../styles/flight-results.css';
import { MdOutlineArrowDropDownCircle } from 'react-icons/md';

import { useState, useEffect } from 'react';
import uuid from 'react-uuid';

import FlightPrice from './flightPrice.js';
import FlightDetail from './flight-detail.js';
import Data from '../JSON/test.json';

const FlightResults = ({ flights }) => {

    const [flightArr, setFlights] = useState([]);

    const testObj = Data;

    useEffect(() => {
        if (flights && flights.length > 0) { scrollToFlightSection(); }
        if (!flights.length) { setFlights(testObj); }
        else { setFlights(flights); }
    }, [flights]);


    const oneWayDuration = (segment) => {
        let totalDuration = {hours: 0, minutes: 0};

        for (let i = 0; i < segment.legs.length; ++i) {
            let result = calcDuration(segment.legs[i].departureDateTime, segment.legs[i].arrivalDateTime);
            totalDuration.hours += result.hours;
            totalDuration.minutes += result.minutes;
        }        

        let format_hours = totalDuration.hours + Math.floor(totalDuration.minutes / 60);
        let format_minutes = totalDuration.minutes % 60;
        let time_duration = ('0' + format_hours.toString()).slice(-2) + " h " + ('0' + format_minutes.toString()).slice(-2) + ' min';
        
        return time_duration;
    }

    const calcDuration = (depart_date, arrival_date) => {
        let seconds = (new Date(arrival_date) - new Date(depart_date))/ 1000;
        let minutes = seconds / 60;
        let hours = minutes / 60;

        hours = Math.ceil(hours * 100) / 100;
        minutes = Math.round((hours - Math.floor(hours)).toFixed(2) * 60);
        hours = Math.floor(hours);
        
        return {hours, minutes};
    }

    const getDate = (date) => {
        const options = { weekday: 'short', month: 'short', day: 'numeric' };
        let parse_date = new Date(date).toLocaleDateString(navigator.language, options).split(',');
        return parse_date[0] + parse_date[1] + ", " + getTime(date);
    }

    const getTime = (date) => {
        var options = { hour: 'numeric', minute: '2-digit' };
        let time = new Date(date).toLocaleTimeString(navigator.language, options);
        return time;
    }

    const toggleFlightDetail = (e) => { 
        let flight_detail = e.currentTarget.parentElement?.querySelector('.flight-detail');
        setTimeout(() => {
            if (!flight_detail?.classList.contains('show')) { closeFlightDetail(); }
            flight_detail?.classList.toggle('show');

            document.addEventListener('click', (e) => { outsideClick(e, flight_detail); });
        });
    }
    
    const outsideClick = (e, flight_detail) => {
        if (!flight_detail.contains(e.target)) { closeFlightDetail(); }
    }

    const closeFlightDetail = () => {
        document.querySelector('.flight-detail.show')?.classList.remove('show');  
    }

    const scrollToFlightSection = () => {
        setTimeout(() => {
            let flight = document.getElementsByClassName('flight')[0];
            let autocomplete = document.querySelector('.autocomplete-form');

            let scrollY = autocomplete?.getBoundingClientRect().height + flight?.getBoundingClientRect().height;
            window?.scrollTo({top: scrollY, behavior: 'smooth'});
        }, 500)
    }

    return (
        <div className='flight-results-wrapper'>
            {flightArr.length > 0 &&
                <div className="flight-results flex">
                    {flightArr.map(flight => 
                        <div className="flight" key={uuid()}>
                            <div className='flight-header flex'>
                                <div className='flight-airline flex'>
                                    <img src={flight.segments[0].legs[0].marketingCarrier.logoUrl} alt=""/>
                                    <div className='grid'>
                                        <span className='flight-name'>{flight.segments[0].legs[0].marketingCarrier.displayName}</span>
                                        <span className='flight-code'>
                                            {flight.segments[0].legs[0].marketingCarrier.code + " " + flight.segments[0].legs[0].flightNumber}
                                        </span>
                                        <span className='flight-time-duration'> 
                                            {oneWayDuration(flight.segments[0])}
                                        </span>
                                    </div>
                                </div>
                            
                                <div className='flight-depart-date flex'>
                                    <span>Depart Date</span>
                                    <span>{getDate(flight.segments[0].legs[0].departureDateTime)}</span>
                                </div> 

                                <div className='flight-class'>
                                    {flight.segments[0].legs[0].classOfService.toLowerCase().replace('_', " ")} Class
                                </div>

                                <div className='flight-trip'>{sessionStorage.getItem('select_trip')}</div>

                                <div className='show-detail flex' onClick={toggleFlightDetail}>
                                    <span>Show details</span>
                                    <MdOutlineArrowDropDownCircle className='icon'/>
                                </div>

                                <FlightDetail closeFlightDetail={closeFlightDetail} flight={flight}/>
                            </div>
                            
                            <div className='flight-divider'/>

                            <div className='flight-footer flex'>
                                <span className='flight-price-wrapper flex'>
                                    <span>USD</span>
                                    <FlightPrice 
                                        currency={flight.purchaseLinks[0].originalCurrency}
                                        price={flight.purchaseLinks[0].totalPrice}
                                    />
                                    <span> / Person</span>
                                </span>
                            </div>
                        </div>)
                    }
                </div>
            }
        </div>
    )
}

export default FlightResults;
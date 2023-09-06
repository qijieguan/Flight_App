import '../styles/search-results.css';
import { IoMdAirplane } from 'react-icons/io';

import { useEffect } from 'react';
import uuid from 'react-uuid';

const SearchResults = ({ flights }) => {

    useEffect(() => {
        //console.log(flights);
    }, [flights]);

    const calcDuration = (depart_date, arrival_date) => {
        let seconds = (new Date(arrival_date) - new Date(depart_date))/ 1000;

        let minutes = seconds / 60;
        let hours = minutes / 60;

        hours = Math.ceil(hours * 100) / 100;
        minutes = Math.round((hours - Math.floor(hours)).toFixed(2) * 60);
        hours = Math.floor(hours);

        let time_duration = ('0' + hours.toString()).slice(-2) + "h " + ('0' + minutes.toString()).slice(-2) + 'm';

        return time_duration;
    }

    const getTime = (date) => {
        return new Date(date).toUTCString().split(' ')[4].slice(0, 5);
    }

    return (
        <div className="search-results grid">

            {flights && flights.length > 0 &&
                flights.map(flight => 
                    <div className="flight flex" key={uuid()}>
                        <div className="flight-time grid">
                            <span>{getTime(flight.segments[0].legs[0].departureDateTime)}</span>
                            <span className='flight-time-segment flex'>
                                <span>&#9632;</span>
                                <hr/>
                                <span>&#9632;</span>
                                <IoMdAirplane className='airplane-icon'/>
                                <div className='flight-time-duration'>
                                    {calcDuration(
                                        flight.segments[0].legs[0].departureDateTime, 
                                        flight.segments[0].legs[flight.segments[0].legs.length - 1].arrivalDateTime)
                                    }
                                </div>
                            </span>
                            <span>{getTime(flight.segments[0].legs[flight.segments[0].legs.length - 1].arrivalDateTime)}</span>
                        </div>
                        <div className='flight-points flex'>
                            <span>{flight.segments[0].legs[0].originStationCode}</span>
                            <span>{
                                flight.segments[0].legs[flight.segments[0].legs.length - 1].destinationStationCode}
                            </span>
                        </div>
                        <div className='flight-divider'/>
                        <div className='flight-airline flex'>
                            <img src={flight.segments[0].legs[0].marketingCarrier.logoUrl} alt=""/>
                            <span className='flight-name'>{flight.segments[0].legs[0].marketingCarrier.displayName}</span>
                            <span className='flight-price'>${flight.purchaseLinks[0].totalPrice}</span>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default SearchResults
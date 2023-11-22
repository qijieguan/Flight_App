import '../styles/flight-segment.css';
import { FaLocationDot } from 'react-icons/fa6';
import { IoAirplane } from "react-icons/io5";

import axios from 'axios';
import { useEffect, useState } from 'react';

const FlightSegment = ({leg}) => {

    const baseURL = window.location.href.includes('localhost:3000') ? 'http://localhost:3001' : '';
    const [originDetail, setOrigin] = useState(null)
    const [destDetail, setDest] = useState(null);

    useEffect(() => {
        getAirportDetail('origin', leg.originStationCode);
        getAirportDetail('destination', leg.destinationStationCode);
    }, [leg]);

    const getAirportDetail = async (param, iata_code) => {
        axios.post(baseURL + '/util/airport-detail/', { iata_code: iata_code })
        .then((response) => { 
            if (param === 'origin') { setOrigin(response.data[0]); }
            else { setDest(response.data[0]); }
        });
    }

    const calcDuration = (depart_date, arrival_date) => {
        let seconds = (new Date(arrival_date) - new Date(depart_date))/ 1000;
        let minutes = seconds / 60;
        let hours = minutes / 60;

        hours = Math.ceil(hours * 100) / 100;
        minutes = Math.round((hours - Math.floor(hours)).toFixed(2) * 60);
        hours = Math.floor(hours);

        let time_duration = ('0' + hours.toString()).slice(-2) + " h " + ('0' + minutes.toString()).slice(-2) + ' min';

        return time_duration;
    }

    const getDate = (date) => {
        const options = { weekday: 'short', month: 'short', day: 'numeric' };
        let parse_date = new Date(date).toLocaleDateString(navigator.language, options).split(',');
        return parse_date;
    }

    const getTime = (date) => {
        var options = { hour: 'numeric', minute: '2-digit' };
        let time = new Date(date).toLocaleTimeString(navigator.language, options);
        return time;
    }

    return (
        <div className='flight-segment grid'>
            <div className='flight-segment-left flex'>
                <span className='flight-segment-date flex'>
                    <span>{getTime(leg.departureDateTime)} </span>
                    <span>{getDate(leg.departureDateTime)}</span>
                </span> 

                <span className='flight-segment-date flex'>
                    <span>{getTime(leg.arrivalDateTime)} </span>
                    <span>{getDate(leg.arrivalDateTime)}</span>
                </span> 
            </div>
        
            <div className='line-segment flex'>
                <span className='black-circle'>&#9679;</span>
                <div className='icon-wrapper flex'><IoAirplane className='icon'/></div>
                <div className='vertical-line'/>
                <FaLocationDot className='icon'/>
            </div>

            <div className='flight-segment-right flex'>
                {originDetail &&
                    <div className='airport-location flex'>
                        <span className='airport-city'>
                            {originDetail.city ? originDetail.city : originDetail.country }
                        </span>
                        <span className='airport-name'>
                            { originDetail.name } ({ originDetail.iata_code }) 
                        </span>
                    </div>
                }
    
                <div className='carrier-side-text flex'>
                    <span className='flight-duration'>
                        {calcDuration(leg.departureDateTime, leg.arrivalDateTime)}
                    </span>
                    <span className='carrier-name'> 
                        {leg.operatingCarrier.displayName} ({leg.operatingCarrier.code + " " + leg.flightNumber})
                    </span>
                </div>

                {destDetail &&
                    <div className='airport-location flex'>
                        <span className='airport-city'>
                            {destDetail.city ? destDetail.city : destDetail.country }
                        </span>
                        <span className='airport-name'>
                            { destDetail.name } ({ destDetail.iata_code }) 
                        </span>
                    </div>
                }
            </div>
        </div>
    )
}

export default FlightSegment;
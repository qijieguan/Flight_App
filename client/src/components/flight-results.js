import '../styles/flight-results.css';
import { IoMdAirplane } from 'react-icons/io';
import { MdOutlineArrowDropDownCircle,  MdFlightTakeoff, MdFlightLand } from 'react-icons/md';

import { useEffect } from 'react';
import uuid from 'react-uuid';

import FlightSegment from './flight-segment.js';

const FlightResults = ({ flights }) => {

    const testObj = [
        {segments: [
            {legs: [
                {
                    arrivalDateTime: "2023-09-29T17:35:00+09:00",
                    departureDateTime: "2023-09-28T12:10:00-07:00",
                    marketingCarrier: {
                        displayName: 'Example',
                        logoUrl: "https://static.tacdn.com/img2/flights/airlines/logos/100x100/Emirates2.png"
                    },
                    originStationCode: 'LAX',
                    destinationStationCode: 'TPE'
                }
            ]}, 
            {legs: [
                {
                    arrivalDateTime: "2023-09-30T05:35:00+09:00",
                    departureDateTime: "2023-09-29T17:35:00+09:00",
                    marketingCarrier: {
                        displayName: 'Example',
                        logoUrl: "https://static.tacdn.com/img2/flights/airlines/logos/100x100/Emirates2.png"
                    },
                    originStationCode: 'TPE',
                    destinationStationCode: 'LAX'
                }
            ]}
        ],
        purchaseLinks: [{
            totalPrice: 5000,
        }],
        },
    ]

    useEffect(() => {
        //console.log(flights);
        //console.log(tempFlightObj)
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
        //console.log(new Date(date).toUTCString());
        let meridiem = 'am';
        let time = new Date(date).toUTCString().split(' ')[4].slice(0, 5);
        if (Number(time.split(':')[0]) % 12 >= 0) { 
            time = Number(time.split(':')[0]) % 12 + ":" + time.split(':')[1];
            meridiem = 'pm';
        }
        return time + meridiem;
    }

    const toggleFlightDetail = (e) => { 
        let flight_detail = e.currentTarget.parentElement?.querySelector('.flight-detail');
        setTimeout(() => {
            if (!flight_detail?.classList.contains('show')) {
                document.querySelector('.flight-detail.show')?.classList.remove('show');   
            }
            flight_detail?.classList.toggle('show');
        });
    }

    //flights && flights.length > 0 &&

    return (
        <div className="flight-results grid">
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
                        <div className='show-detail flex' onClick={toggleFlightDetail}>
                            <span>Show details</span>
                            <MdOutlineArrowDropDownCircle className='icon'/>
                        </div>
                        {
                            <div className='flight-detail flex'>
                                <div className='flight-detail-segment flex'>
                                    <label className='depart-label'>Depart Trip</label>
                                    <div className='depart-detail flex'>
                                        {flight.segments[0].legs.map(leg => 
                                            <FlightSegment param={"depart"} leg={leg} key={uuid()}/>
                                        )}  
                                    </div>
                                </div>

                                <div className='flight-detail-segment flex'>
                                    <label className='return-label'>Return Trip</label>
                                    <div className='return-detail flex'>
                                    {flight.segments[1].legs.map(leg => 
                                        <FlightSegment param={"return"} leg={leg} key={uuid()}/>
                                    )} 
                                    </div>
                                </div>
                            </div>
                        }
                    </div>
                )
            }
        </div>
    )
}

export default FlightResults
import '../styles/flight-results.css';
import { IoMdAirplane } from 'react-icons/io';
import { MdOutlineArrowDropDownCircle, MdOutlineClose } from 'react-icons/md';
import { AiOutlineArrowRight } from 'react-icons/ai';

import { useEffect } from 'react';
import uuid from 'react-uuid';

import FlightPrice from './flightPrice.js';
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
                    operatingCarrier: {
                        displayName: 'Example',
                        code: 'Ex'
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
                    operatingCarrier: {
                        displayName: 'Example',
                        code: 'Ex'
                    },
                    originStationCode: 'JFK',
                    destinationStationCode: 'LAX'
                }
            ]}
        ],
        purchaseLinks: [{
            originalCurrency: 'USD',
            totalPrice: 0,
            url: "https://images.pexels.com/photos/5344850/pexels-photo-5344850.jpeg?auto=compress&cs=tinysrgb&w=600"
        }],
        }
    ]

    useEffect(() => {
        //console.log(flights);
        //console.log(tempFlightObj)
        if (flights && flights.length > 0) { 
            scrollToFlightSection()
        }
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
                            <span className='flight-price'>
                                <FlightPrice 
                                    currency={flight.purchaseLinks[0].originalCurrency}
                                    price={flight.purchaseLinks[0].totalPrice}
                                />
                            </span>
                        </div>
                        <div className='show-detail flex' onClick={toggleFlightDetail}>
                            <span>Show details</span>
                            <MdOutlineArrowDropDownCircle className='icon'/>
                        </div>
                        
                        { <div className='flight-detail'>
                            <MdOutlineClose className='icon' onClick={closeFlightDetail}/>
                            <h1>Flight Overview</h1>
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

                            <div className='flight-detail-segment purchase-link'>
                                <label className='purchase-label'>Purchase Link</label>
                                <span onClick={() => {window.open(flight.purchaseLinks[0].url, '_blank')}}>
                                    {flight.purchaseLinks[0].url}
                                </span>
                            </div>

                            <button className='close-btn flex' onClick={closeFlightDetail}>
                                <span>Go Back</span>
                                <AiOutlineArrowRight className='icon'/>
                            </button>
                        </div> }
                    </div>
                )
            }
        </div>
    )
}

export default FlightResults
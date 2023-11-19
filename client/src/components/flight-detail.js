import '../styles/flight-detail.css';
import { MdOutlineClose } from 'react-icons/md';
import { AiOutlineArrowRight } from 'react-icons/ai';
import { PiAirplaneTiltFill } from 'react-icons/pi';

import uuid from 'react-uuid';

import FlightSegment from './flight-segment.js';

const FlightDetail = ({closeFlightDetail, flight}) => {
    return (
        <div className='flight-detail flex'>
            <label>Flight Overview </label>
            <div className='flight-detail-segment flex'>
                <label className='depart-label'>Depart Trip</label>
                <div className='depart-detail flex'>
                    {flight.segments[0].legs.map(leg => 
                        <FlightSegment leg={leg} key={uuid()}/>)
                    }  
                </div>
            </div>
            {flight.segments[1] &&
                <div className='flight-detail-segment flex'>
                    <label className='return-label'>Return Trip</label>
                    <div className='return-detail flex'>
                        {flight.segments[1].legs.map(leg => 
                            <FlightSegment leg={leg} key={uuid()}/>
                        )} 
                    </div>
                </div>
            }

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
        </div> 
    )
}

export default FlightDetail;
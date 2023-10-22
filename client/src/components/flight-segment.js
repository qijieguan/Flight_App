import '../styles/flight-segment.css';
import { MdFlightTakeoff, MdFlightLand } from 'react-icons/md';

const FlightSegment = ({leg}) => {

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
        <div className='flight-segment'>
            <div className='flight-segment-start grid'>
                <MdFlightTakeoff className='icon'/>
                <span className='flight-segment-date flex'>
                    <span>{getTime(leg.departureDateTime)} </span>
                    <span>{getDate(leg.departureDateTime)}</span>
                </span> 
                <span className='black-circle'>&#9679;</span>
                <span className='carrier-code'>{ leg.originStationCode }</span>
                <span className='carrier-name'> 
                    ({leg.operatingCarrier.displayName} - {leg.operatingCarrier.code + " " + leg.flightNumber})
                </span>
            </div>
            <div className='flight-segment-duration'>
                {calcDuration(leg.departureDateTime, leg.arrivalDateTime)}
            </div>
            <div className='flight-segment-end grid'>
                <MdFlightLand className='icon'/>
                <span className='flight-segment-date flex'>
                    <span>{getTime(leg.arrivalDateTime)} </span>
                    <span>{getDate(leg.arrivalDateTime)}</span>
                </span> 
                <span className='black-circle'>&#9679;</span> 
                <span className='carrier-code'>{ leg.destinationStationCode } </span>
            </div>
        </div>
    )
}

export default FlightSegment;
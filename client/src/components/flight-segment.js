import '../styles/flight-segment.css';
import { MdFlightTakeoff, MdFlightLand } from 'react-icons/md';

const FlightSegment = ({param, leg}) => {
    
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

    return (
        <div className='flight-segment'>
            <div className={param + '-start flex'}>
                <MdFlightTakeoff className='icon'/>
                <span>{ getTime(leg.departureDateTime) } </span> 
                <span> - </span>
                <span>{ leg.originStationCode } <span>({leg.operatingCarrier.displayName} - {leg.operatingCarrier.code})</span></span>
            </div>
            <div className={param + '-duration'}>
                {calcDuration(
                    leg.departureDateTime, 
                    leg.arrivalDateTime
                )}
            </div>
            <div className={param + '-end flex'}>
                <MdFlightLand className='icon'/>
                <span>{ getTime(leg.arrivalDateTime) } </span>
                <span> - </span> 
                <span>{ leg.destinationStationCode } </span>
            </div>
        </div>
    )
}

export default FlightSegment;
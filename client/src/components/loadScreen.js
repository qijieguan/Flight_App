import '../styles/load-screen.css';
import flight_img from '../images/flight.webp';

const LoadScreen = () => {
    return (
        <div className="load-screen flex">
            <span>Find Live Flights </span>
            <span>Match your flight preferences</span>
            <img src={flight_img} alt=""/>
        </div>
    )
}

export default LoadScreen;
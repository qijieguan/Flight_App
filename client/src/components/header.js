import '../styles/header.css';
import { FiChevronDown } from 'react-icons/fi';
import { LuEqual } from 'react-icons/lu';
import flight_img from '../images/flight.webp';
import rain_img from '../images/rain.webp';

import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

const Header = () => {

    const location = useLocation();

    const [tripType, setTrip] = useState('One-Way');
    const [classType, setClass] = useState('Economy');

    useEffect(() => {
        if (!sessionStorage.getItem('select_trip')) {
            sessionStorage.setItem('select_trip', 'one-way');
        }
        if (!sessionStorage.getItem('select_class')) {
            sessionStorage.setItem('select_class', 'economy');
        }
    }, [location]);

    const toggleReturnDate = () => {
        let return_date = document.getElementsByClassName('date-picker-wrapper')[1];
        
        if (sessionStorage.getItem('select_trip').includes('one')) { return_date?.classList.add('hide'); }
        else { return_date?.classList.remove('hide'); }
    }

    const selectTrip = (e) => {
        document.querySelector('.flight-trip-options')?.classList.add('clicked');
        let result = e.target.innerHTML.replace(' ', '-').toLowerCase();
        sessionStorage.setItem('select_trip', result);

        setTrip(result);
        toggleReturnDate();
    }

    const selectClass = (e) => {
        document.querySelector('.flight-class-options')?.classList.add('clicked');
        let result = e.target.innerHTML.toLowerCase();

        setClass(result);
        sessionStorage.setItem('select_class', result);
    }


    const handleMouseEnter = () => {
        document.querySelector('.flight-trip-options')?.classList.remove('clicked');
        document.querySelector('.flight-class-options')?.classList.remove('clicked');
    }

    return (
        <header className='header flex'>
            <div className='header-logo flex'>
                <img className='logo' src={flight_img} alt=""/>
                <div className='name'>Sky Nation</div>
            </div>

            <div className='header-trip-options flex'>
                <div className='header-option-1 header-option active flex' onMouseEnter={handleMouseEnter}>
                    <span>{tripType}</span>
                    <div className='icon-wrapper flex'><FiChevronDown className='icon'/></div>
                </div>

                <div className='flight-trip-options flight-options flex'>
                    <span onClick={selectTrip}>ONE WAY</span>
                    <span onClick={selectTrip}>TWO WAY</span>
                </div>

                <div className='header-option-2 header-option flex' onMouseEnter={handleMouseEnter}>
                    <span>{classType}</span>
                    <div className='icon-wrapper flex'><FiChevronDown className='icon'/></div>
                </div>

                <div className='flight-class-options flight-options flex'>
                    <span onClick={selectClass}>Economy</span>
                    <span onClick={selectClass}>Prem. Economy</span>
                    <span onClick={selectClass}>Business</span>
                    <span onClick={selectClass}>First</span>
                </div>

            </div>

            <div className='header-links'>
                {!location.pathname.includes('/tour-places') ?
                    <Link to='/tour-places'><span>Travel Suggestions</span></Link> :
                    <Link to='/'><span>Find Live Flights</span></Link>
                }
            </div>

            <div className='header-profile flex'>
                <div className='icon-wrapper flex'><LuEqual className='.icon'/></div>
                <img className='header-profile-avatar' src={rain_img} alt=""/>
            </div>
        </header>
    )
}

export default Header;
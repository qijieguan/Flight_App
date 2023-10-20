import '../styles/header.css';
import { FiChevronDown } from 'react-icons/fi';
import { LuEqual } from 'react-icons/lu';

import flight_img from '../images/flight.webp';
import rain_img from '../images/rain.webp';

import { Link, useLocation } from 'react-router-dom';
import { useEffect } from 'react';

const Header = () => {

    const location = useLocation();

    useEffect(() => {
        //console.log(location.pathname)
    }, [location])

    return (
        <header className='header flex'>
            <div className='header-logo flex'>
                <img className='logo' src={flight_img} alt=""/>
                <div className='name'>Sky Nation</div>
            </div>

            <div className='header-trip-options flex'>
                <div className='header-option-1 active flex'>
                    <span>Two-way</span>
                    <div className='icon-wrapper flex'>
                        <FiChevronDown className='icon'/>
                    </div>
                </div>
                <div className='header-option-2 flex'>
                    <span>Economy</span>
                    <div className='icon-wrapper flex'>
                        <FiChevronDown className='icon'/>
                    </div>
                </div>
            </div>

            <div className='header-links'>
                {!location.pathname.includes('/tour-places') ?
                    <Link to='/tour-places'>
                        <span>Travel Suggestions</span>
                    </Link>
                    :
                    <Link to='/'>
                        <span>Find Live Flights</span>
                    </Link>
                }
            </div>

            <div className='header-profile flex'>
                <div className='icon-wrapper flex'>
                    <LuEqual className='.icon'/>
                </div>
                <img className='header-profile-avatar' src={rain_img} alt=""/>
            </div>
        </header>
    )
}

export default Header;
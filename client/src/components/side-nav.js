import '../styles/side-nav.css';
import { AiOutlineArrowRight } from 'react-icons/ai';
import Slider from '@mui/material/Slider';
import Data from '../JSON/test.json';

import { useState, useEffect } from 'react';

const SideNav = ({flights}) => {

    const [pairValues, setPair] = useState([500, 1000]);
    const [uniqueAirlines, setUnique] = useState([]);
    
    const testObj = Data;

    useEffect(() => {
        if (!flights.length) { getUniqueAirlines(testObj); }
        else { getUniqueAirlines(flights); }
    }, [flights]);

    window.addEventListener("resize", (e) => {
        let side_nav = document.querySelector('.side-nav');
        if (window.innerWidth <= 800) {
            side_nav.classList.remove('active');
        }
    });

    const getUniqueAirlines = (data) => {
        const flight_set = [...new Set(data.map(item => item.segments))]; 
        let airline_set = [];

        flight_set.forEach(flight => {
            airline_set.push(flight[0].legs[0].marketingCarrier.displayName);
        });

        setUnique([... new Set(airline_set)]);
    }

    const valuetext = (value) => { return `USD ${value}`; }

    const minDistance = 10;

    const handleChange = (event, newValue, activeThumb) => {
        if (!Array.isArray(newValue)) { return; }
    
        if (activeThumb === 0) {
          setPair([Math.min(newValue[0], pairValues[1] - minDistance), pairValues[1]]);
        } else {
          setPair([pairValues[0], Math.max(newValue[1], pairValues[0] + minDistance)]);
        }
    };

    const toggleFilterForm = () => {
        let side_nav = document.querySelector('.side-nav');
        side_nav?.classList.toggle('active');
    }

    return (

        <div className='side-nav flex'>
            <label className="filter-label flex"> 
                <span>Filter</span> 
                <div className='close-filter flex' onClick={toggleFilterForm}>
                    <span>Go Back</span>
                    <AiOutlineArrowRight className='icon'/>
                </div>
            </label>
            <label className='price-range-label'> Price Range </label>

            <div className='multi-range-slider flex'>
                <Slider
                    value={pairValues}
                    min={20}
                    max={1500}
                    onChange={handleChange}
                    valueLabelDisplay="auto"
                    getAriaValueText={valuetext}
                    valueLabelFormat={valuetext}
                    className="react-slider"
                    sx={{
                        '& .MuiSlider-thumb': {
                          height: '2vh',
                          width: '2vh',
                          background: 'tomato'
                        },
                    }}
                    disableSwap
                />
            </div>

            <label className='class-label'> Flight Class </label>
            <form className='class-filters'>
                <div className='class-filter flex' >
                    <input type="radio" id="economy" name="economy"/>
                    <label htmlFor="economy">Economy</label>
                </div>
                <div className='class-filter flex' >
                    <input type="radio" id="premium-economy" name="premium-economy"/>
                    <label htmlFor="premium-economy">Prem. Economy</label>
                </div>
                <div className='class-filter flex' >
                    <input type="radio" id="business" name="business"/>
                    <label htmlFor="business">Business</label>
                </div>
                <div className='class-filter flex'>
                    <input type="radio" id="first" name="first"/>
                    <label htmlFor="first">First</label>
                </div>
            </form>

            <label className='airline-label'> Airlines </label>
            <form className='airline-filters'>
                {uniqueAirlines.length > 0 &&
                    uniqueAirlines.map(unique => 
                        <div className='airline-filter flex' key={unique}>
                            <input type="checkbox" id={unique} name={unique}/>
                            <label htmlFor="first">{unique}</label>
                        </div>
                    )
                }
            </form>
            <button className='filter-button'>Apply Filters</button>
        </div>
    )
}

export default SideNav;
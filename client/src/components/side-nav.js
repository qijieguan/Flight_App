import '../styles/side-nav.css';
import { AiOutlineArrowRight } from 'react-icons/ai';
import Slider from '@mui/material/Slider';
import Data from '../JSON/test.json';

import { useState, useEffect } from 'react';

const SideNav = ({flights, applyFilters}) => {

    const [priceRange, setPriceRange] = useState([500, 1000]);
    const [maxPrice, setMaxPrice] = useState(1500);
    const [uniqueAirlines, setUnique] = useState([]);
    const [selectClass, setClass] = useState("");
    const [selectAirlines, setAirlines] = useState([]);
    
    const testObj = Data;

    useEffect(() => {
        if (!flights.length) { 
            setUniqueAirlines(testObj); 
            updatePriceRange(testObj);
        }
        else { 
            setUniqueAirlines(flights); 
            updatePriceRange(flights);
        }
        setClass("");
        setAirlines([]);
    }, [flights]);

    window.addEventListener("resize", (e) => {
        let side_nav = document.querySelector('.side-nav');
        if (window.innerWidth <= 800) {
            side_nav?.classList.remove('active');
        }
    });

    const updatePriceRange = (data) => {
        let minPrice = data[0].purchaseLinks[0].totalPrice;
        let maxPrice = data[0].purchaseLinks[0].totalPrice;

        data.forEach(flight => {
            let currPrice = flight.purchaseLinks[0].totalPrice;
            if (currPrice >= 0 && currPrice >= maxPrice) {
                maxPrice = currPrice;
            }
            if (currPrice >= 0 && currPrice <= minPrice) {
                minPrice = currPrice;
            }
        });
        setPriceRange([minPrice, maxPrice])
        setMaxPrice(maxPrice + 500);
    }

    const setUniqueAirlines = (data) => {
        const flight_set = [...new Set(data.map(item => item.segments))]; 
        let airline_set = [];

        flight_set.forEach(flight => {
            airline_set.push(flight[0].legs[0].marketingCarrier.displayName);
        });
       
        setUnique([... new Set(airline_set)]);
    }

    const valuetext = (value) => { return `USD ${value}`; }

    const handleChange = (event, newValue, activeThumb) => {
        const minDistance = 10;

        if (!Array.isArray(newValue)) { return; }
    
        if (activeThumb === 0) {
          setPriceRange([Math.min(newValue[0], priceRange[1] - minDistance), priceRange[1]]);
        } else {
          setPriceRange([priceRange[0], Math.max(newValue[1], priceRange[0] + minDistance)]);
        }
    };

    const toggleFilterForm = () => {
        let side_nav = document.querySelector('.side-nav');
        side_nav?.classList.toggle('active');
    }

    const toggleClass = (e) => { setClass(e.target.id); }

    const toggleAirlines = (e) => {
        if (e.target.checked) { setAirlines([...selectAirlines, e.target.id]); }
        else { setAirlines(selectAirlines.filter(airline => airline !== e.target.id)); }
    }

    const handleSubmit = () => {
        applyFilters({price_range: priceRange, class: selectClass, airlines: selectAirlines});
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
                    value={priceRange}
                    min={20}
                    max={maxPrice}
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
                    <input type="radio" id="economy" name="class-filter" onClick={toggleClass}/>
                    <label htmlFor="economy">Economy</label>
                </div>
                <div className='class-filter flex' >
                    <input type="radio" id="premium_economy" name="class-filter" onClick={toggleClass}/>
                    <label htmlFor="premium_economy">Prem. Economy</label>
                </div>
                <div className='class-filter flex' >
                    <input type="radio" id="business" name="class-filter" onClick={toggleClass}/>
                    <label htmlFor="business">Business</label>
                </div>
                <div className='class-filter flex'>
                    <input type="radio" id="first" name="class-filter" onClick={toggleClass}/>
                    <label htmlFor="first">First</label>
                </div>
            </form>

            <label className='airline-label'> Airlines </label>
            <form className='airline-filters'>
                {uniqueAirlines.length > 0 &&
                    uniqueAirlines.map(unique => 
                        <div className='airline-filter flex' key={unique}>
                            <input type="checkbox" id={unique} name={unique} onClick={toggleAirlines}/>
                            <label htmlFor={unique}>{unique}</label>
                        </div>
                    )
                }
            </form>
            <button className='filter-button' onClick={handleSubmit}>Apply Filters</button>
        </div>
    )
}

export default SideNav;
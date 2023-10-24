import '../styles/places-autocomplete.css';
import { MdFlightTakeoff, MdFlightLand } from 'react-icons/md';
import {BsArrowRightCircleFill } from 'react-icons/bs';

import usePlacesAutocomplete from 'use-places-autocomplete';
import { Combobox, ComboboxInput, ComboboxPopover, ComboboxList, ComboboxOption } from '@reach/combobox';
import "@reach/combobox/styles.css";

import { useState, useEffect } from 'react';
import axios from 'axios';

import Data from '../JSON/suggestion.json';

const PlacesAutocomplete = ( {param, setAirportInput} ) => {

    const baseURL = window.location.href.includes('localhost:3000') ? 'http://localhost:3001' : '';

    const [apiCall, setAPICall] = useState(false);
    const [queryInp, setQuery] = useState("");
    const [suggestions, setSuggestions] = useState([]);

    const {
        ready,
        value,
        setValue,
        suggestions: {status, data},
        clearSuggestions,
    } = usePlacesAutocomplete( { requestOptions : { types: ["airport"] } } );

    useEffect(() => {
        
        /*
        let airports = [];

        Data.forEach(children => {
            children.children.forEach(airport => {
                airport.push(airport.shortName);
            });
        });

        //console.log(airports);
        */
    }, [param]);

    const searchAirports = async () => {
        await axios.post(baseURL + '/flight/search-airports/', {
            query: queryInp
        })
        .then(response => {
            let results = response.data.data ? response.data.data: [];
            let airports = [];
            //console.log(results);
            
            if (results.length > 0) {
                results.forEach(children => {
                    if (children.children) {
                        children.children.forEach(airport => { airports.push(airport.name);});
                    }
                    else { airports.push(children.name); }     
                });
            }

            setSuggestions(airports);
        });
    }

    const suggestionRequest = (e) => {
        clearSuggestions();
        searchAirports(e, e.target.value);
    }

    const handleSelect = async (address) => {
        let parseAddress = address.split(',');
        let trim = "";

        parseAddress.forEach(s => { if (s.includes('(') && s.includes(')')) { trim = s; } });

        setValue(trim, false);

        setAPICall(false);
        setSuggestions([]);
        clearSuggestions();
        
        setAirportInput({type: param, address: trim});
    }  

    const handleChange = (e) => {
        setValue(e.target.value);
        setQuery(e.target.value);

        if (e.target.value.length >= 4 && !e.target.value.toLowerCase().includes(queryInp.toLowerCase())) {
            setSuggestions([]);
        }

        let filteredResults = data.filter(d => d.description.includes('(') && d.description.includes(')'));
        if (e.target.value.length >= 4 && filteredResults.length === 0) { setAPICall(true); }
        else { setAPICall(false); }
    }

    return (
        <div className='combobox flex'>
            <Combobox onSelect={handleSelect} style={{ width: '100%'}}>
                <div className='combobox-input-wrapper flex'>
                    {param === 'origin' ? <span>FROM</span> : <span>TO</span>}   
                    <div className='input-wrapper flex'>
                        <ComboboxInput 
                            className='combobox-input'
                            value={value.split(',')[0].toLowerCase()} 
                            onChange={(e) => {handleChange(e)}}
                            placeholder={"Enter " + param + " airport"}
                            disabled={!ready}
                        />
                        <div className='input-icon'>
                            { param === 'origin' ? <MdFlightTakeoff/> : <MdFlightLand/> }
                        </div>
                    </div>
                </div>
           
                <ComboboxPopover className='combobox-popover'>
                    <ComboboxList className='combobox-list'>
                        {!apiCall && 
                            data.filter(d => 
                                d.description.includes('(') && d.description.includes(')'))
                                .map(({ place_id, description }) => 
                                <div className='combobox-option-wrapper flex' key={place_id}>
                                    <div className='combobox-option flex' value={description}>
                                        <span className='combobox-option-description flex' onClick={() => {handleSelect(description)}}>
                                            <span>{description}</span>
                                            <span className='option-icon'>
                                                {param === 'origin' ? <MdFlightTakeoff/> : <MdFlightLand/> }
                                            </span>
                                        </span>
                                    </div>
                                </div>
                            ) 
                        }
                        {apiCall && suggestions.length === 0 &&
                            <div className='airport-suggestions'>
                                <span className='suggestions-inquiry flex' onClick={suggestionRequest}>
                                    <span>Search Nearby Airports From This Place</span>
                                    <BsArrowRightCircleFill className='icon'/>
                                </span>
                            </div>
                        }

                        {suggestions.length > 0 &&
                            <div className='suggestions-list'>
                                {suggestions.map(airport => 
                                    <div className='suggestions-li flex' onClick={() => {handleSelect(airport)}}>{airport}</div>    
                                )}
                            </div>
                        }
                    </ComboboxList>
                </ComboboxPopover>
                
            </Combobox>
        </div>
    )
}

export default PlacesAutocomplete;
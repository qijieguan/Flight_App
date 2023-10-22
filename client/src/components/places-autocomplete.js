import '../styles/places-autocomplete.css';
import { MdFlightTakeoff, MdFlightLand } from 'react-icons/md';

import usePlacesAutocomplete, {getGeocode, getLatLng} from 'use-places-autocomplete';
import { Combobox, ComboboxInput, ComboboxPopover, ComboboxList, ComboboxOption } from '@reach/combobox';
import "@reach/combobox/styles.css";

import { useState, useEffect } from 'react';
import axios from 'axios';

const PlacesAutocomplete = ( {param, setAirportInput} ) => {

    const baseURL = window.location.href.includes('localhost:3000') ? 'http://localhost:3001' : '';

    const [searchResult, setSearchResult] = useState([]);

    const {
        ready,
        value,
        setValue,
        suggestions: {status, data},
        clearSuggestions,
    } = usePlacesAutocomplete( { requestOptions : { types: ["airport"] } } );

    useEffect(() => {
        /*
        setTimeout(() => {
            let input = document.querySelector('.combobox-input');
            input.addEventListener('keypress', (e) => {
                if (e.key === "Enter") {
                    e.preventDefault();
                    if (input.value.length > 0) {
                        searchAirports(e, input.value);
                    }
                }
            });
        }, 250);
        */
    }, [param]);


    /*
    const searchAirports = async (e, input) => {
        e.preventDefault();
        
        await axios.post(baseURL + '/flight/search-airports/', {
            query: input
        })
        .then(response => {
            setSearchResult(response.data.data);
        });
    }
    */

    const handleSelect = async (address) => {
        setValue(address, false);

        clearSuggestions();

        //const results = await getGeocode({ address });
        //const { lat, lng } = await getLatLng(results[0]);
        
        setAirportInput({type: param, address: address});
    }  

    return (
        <div className='combobox flex'>
            <Combobox onSelect={handleSelect} style={{ width: '100%'}}>
                <div className='combobox-input-wrapper flex'>
                    {param === 'origin'?
                        <span>FROM</span> : <span>TO</span>
                    }   
                    <div className='input-wrapper flex'>
                        <ComboboxInput 
                            className='combobox-input'
                            value={value.split(',')[0]} 
                            onChange={(e) => { setValue(e.target.value)}} 
                            placeholder="Enter valid airport"
                            disabled={!ready}
                            required
                        />
                        <div className='input-icon'>
                            {param === 'origin' ?
                                <MdFlightTakeoff/> : <MdFlightLand/>  
                            }
                        </div>
                    </div>
                </div>
           
                <ComboboxPopover className='combobox-popover'>
                    <ComboboxList className='combobox-list'>
                        { data.filter(d => d.description.toLowerCase().includes('airport')).map(({ place_id, description }) => 
                            <div className='combobox-option-wrapper flex' key={place_id}>
                                <div className='combobox-option flex' value={description}>
                                    <span className='combobox-option-description flex' onClick={() => {handleSelect(description)}}>
                                        <span>{description}</span>
                                        <span className='option-icon'>
                                            {param === 'origin' ?
                                                <MdFlightTakeoff/>
                                                :
                                                <MdFlightLand/>  
                                            }
                                        </span>
                                    </span>
                                </div>
                            </div>
                        ) }
                    </ComboboxList>
                </ComboboxPopover>
                
            </Combobox>
        </div>
    )
}

export default PlacesAutocomplete;
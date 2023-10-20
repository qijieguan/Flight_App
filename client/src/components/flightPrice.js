import { useState, useEffect } from "react";

import axios from "axios";

const FlightPrice = ({currency, price}) => {
    
    const [totalPrice, setTotalPrice] = useState(price);

    const baseURL = window.location.href.includes('localhost:3000') ? 'http://localhost:3001' : "";

    useEffect(() => {
        convertCurrency();
    }, []);

    const convertCurrency = async () => {
        if (currency.toUpperCase === 'USD') { return };

        await axios.post(baseURL + '/util/convert-currency/', {query: currency})
        .then((response) => { setTotalPrice(response.data * price); })
    }

    return (
        <div className="flight-price">
            {totalPrice === 0 ?
                <span>N/A</span>
                :
                <span>${totalPrice.toFixed(2)}</span>
            }
        </div>
    )
}

export default FlightPrice;
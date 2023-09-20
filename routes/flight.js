const router = require('express').Router();
const axios = require('axios');
const csv=require('csvtojson');


const options = (method, url, params, headers) => {
  return {
    method: method,
    url: url,
    params: params,
    headers: headers
  }
};

router.route('/search-flight').post(async (req, res) => {
  try {
    let origin = req.body.origin;
    let destination = req.body.destination;
    let departDate = req.body.departDate;
    let returnDate = req.body.returnDate;

    let origin_iata = origin.includes('(') ? origin.substring(origin.length - 4, origin.length - 1) : null;
    let destination_iata = destination.includes('(') ? destination.substring(destination.length - 4, destination.length - 1) : null;

    const airports = await csv().fromFile('./utils/airports.csv');
    
    if (!origin_iata || !destination_iata) {
      for (var i = 0; i < airports.length; ++i) {

        if (!origin_iata && airports[i].name.includes(origin)) {
          origin_iata = airports[i].iata_code;
        }

        if (!destination_iata && airports[i].name.includes(destination)) {
          destination_iata = airports[i].iata_code;
        }

        if (origin_iata && destination_iata) {
          break;
        }
      }
    }

    //console.log(origin_iata);
    //console.log(destination_iata);

    const method = "GET"
    const url = 'https://tripadvisor16.p.rapidapi.com/api/v1/flights/searchFlights';

    const params = {
      sourceAirportCode: origin_iata,
      destinationAirportCode: destination_iata,
      date: departDate,
      itineraryType: 'ROUND_TRIP',
      sortOrder: 'ML_BEST_VALUE',
      numAdults: '1',
      numSeniors: '0',
      classOfService: 'ECONOMY',
      returnDate: returnDate,
      pageNumber: '1',
      currencyCode: 'USD'
    }
  
    const headers = {
      'X-RapidAPI-Key': process.env.API_KEY,
      'X-RapidAPI-Host': process.env.TRIP_API_HOST,
    }
    
    await axios.request(options(method, url, params, headers))
    .then((response) => { res.json(response.data); });
  }
  catch (error) {
    console.error(error);
  }
});

router.route('/search-airports').post(async (req, res) => {
    const method = "GET";
    const url = 'https://tripadvisor16.p.rapidapi.com/api/v1/flights/searchAirport';
    const params = {query: req.body.query};
    const headers =  {
      'X-RapidAPI-Key': process.env.API_KEY,
      'X-RapidAPI-Host': process.env.TRIP_API_HOST,
    }
   
    try {       
      const response = await axios.request(options(method, url, params, headers));
      res.json(response.data);
    }
    catch (error) {
        console.error(error);
    }
});

router.route('/locations-search').post(async (req, res) => {
  const method = "GET";
  const url = 'https://travel-advisor.p.rapidapi.com/locations/search';
  const params = {
    query: req.body.query,
    limit: '30',
    offset: '0',
    units: 'km',
    location_id: '1',
    currency: 'USD',
    sort: 'relevance',
    lang: 'en_US'
  };
  const headers =  {
    'X-RapidAPI-Key': process.env.API_KEY,
    'X-RapidAPI-Host': process.env.TRAVEL_API_HOST,
  }
 
  try {       
    const response = await axios.request(options(method, url, params, headers));
    let result = response.data.data.filter(data => data.result_type === 'geos');
    res.json(result);
  }
  catch (error) {
      console.error(error);
  }
});

router.route('/attractions-list').post(async (req, res) => {
  const method = "GET";
  const url = 'https://travel-advisor.p.rapidapi.com/attractions/list';
  const params = {
    location_id: req.body.location_id,
    currency: 'USD',
    lang: 'en_US',
    lunit: 'km',
    sort: 'recommended'
  };
  const headers =  {
    'X-RapidAPI-Key': process.env.API_KEY,
    'X-RapidAPI-Host': process.env.TRAVEL_API_HOST,
  }
 
  try {       
    const response = await axios.request(options(method, url, params, headers));
    res.json(response.data);
  }
  catch (error) {
      console.error(error);
  }
});


module.exports = router;

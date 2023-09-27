const router = require('express').Router();
const axios = require('axios');

const options = (method, url, params, headers) => {
    return {
      method: method,
      url: url,
      params: params,
      headers: headers
    }
};

router.route('/convert-currency').post(async (req, res) => {
    const method = "GET";
    const url = 'https://currency-exchange.p.rapidapi.com/exchange';
    const params = { 
      from: req.body.query,
      to: 'USD',
      q: '1.0'
    };
    const headers =  {
      'X-RapidAPI-Key': process.env.API_KEY,
      'X-RapidAPI-Host': process.env.CURRENCY_API_HOST,
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
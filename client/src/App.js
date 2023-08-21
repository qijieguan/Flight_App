import './App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Main from './components/main.js';
import Header from './components/header';

import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import { useJsApiLoader } from '@react-google-maps/api';

function App() {

  const baseURL = window.location.href.includes('localhost:3000') ? 'http://localhost:3001' : '';

  const [libraries] = useState(['places']);
  const { isLoaded } = useJsApiLoader({ googleMapsApiKey: process.env.REACT_APP_API_KEY, libraries });

  useEffect(() => {
    /*
    axios.post(baseURL + '/flight/get-data/', {
      destination: "LED",
      origin: "MOW"
    })
    .then((response) => {console.log(response.data.data)})
    */
  }, []);

  const getAllAirports = async () => {
    await axios.post(baseURL + '/flight/get-all-airports/')
    .then((response) => {console.log(response.data.data)})
  }

  return (
    <div className="App">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Header/>
        {isLoaded &&
          <Main/>
        }
      </LocalizationProvider>
    </div>
  );
}

export default App;

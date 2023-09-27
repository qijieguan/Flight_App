const express = require("express");
const cors = require("cors");
const path = require('path');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());

const corsOptions = {
    origin: "*"
}

app.use(cors(corsOptions));
app.use(express.static(path.join(__dirname, 'client/build')));


const flightRouter = require('./routes/flight');
const utilRouter = require('./routes/util');

app.use('/flight', flightRouter);
app.use('/util', utilRouter);

app.get('*', (req, res) => {res.sendFile(path.join(__dirname+'/client/build/index.html'));});

app.listen(port, () => {
    console.log(`Server is running on port: ${port}!`);
});


const express = require("express");
const cors = require("cors");
const path = require('path');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'client/build')));

app.get('*', (req, res) => {res.sendFile(path.join(__dirname+'/client/build/index.html'));});

app.listen(port, () => {
    console.log(`Server is running on port: ${port}!`);
});


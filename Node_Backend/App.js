const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');

const db=require('./App/Utils/database')

const createSlotRoute = require('./App/Routes/CreateSlot');
const vehicleSlotRoute = require('./App/Routes/Vehicle');


const app = express()
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
  });

const PORT = process.env.PORT || 8000; 

app.listen(PORT,()=>{
    console.log(`Server running at port ${PORT}`);
});

app.use("/node/api/v1/slot", createSlotRoute);
app.use("/node/api/v1/vehicle", vehicleSlotRoute);
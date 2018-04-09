const axios = require("axios");
const CryptoCurrency = require("../models/cryptoCurrency");
const Exchange = require("../models/exchange");
const fs = require("fs");
const mongoose = require('mongoose');

mongoose.Promise = require('bluebird');
// // Use q. Note that you **must** use `require('q').Promise`.
// mongoose.Promise = require('q').Promise;

//Read Mongoose.connect below
// // Connect To Database 
// mongoose.connect(config.database);

//Or USE this instead to connect to db if you rather use .env variables
//Works easier with deploys and git not having to change stuff and just using .env vars
mongoose.connect('mongodb://localhost:27017/cryptoNalysisApi');


// On Connection


process.on('message', async(msg) => {
    try{
        await mongoose.connection.on('connected', () => {
            console.log('Connected to Database '+ process.env.mongoUrl);
          });
        const sum = await scrapeBinance();
        process.send(sum);
    }catch(err){
        console.log(err);
        next(err);
    }

});


const scrapeBinance = async() => {
 try{

 }catch(err){
    console.log(err);
    next(err);
 }
};

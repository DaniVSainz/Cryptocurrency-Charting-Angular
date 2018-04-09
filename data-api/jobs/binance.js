require('dotenv').config()
const axios = require("axios");
const CryptoCurrency = require("../models/cryptoCurrency");
const Exchange = require("../models/exchange");
const fs = require("fs");
const mongoose = require("mongoose");

mongoose.Promise = require("bluebird");
// // Use q. Note that you **must** use `require('q').Promise`.
// mongoose.Promise = require('q').Promise;

//Read Mongoose.connect below
// // Connect To Database
// mongoose.connect(config.database);

//Or USE this instead to connect to db if you rather use .env variables
//Works easier with deploys and git not having to change stuff and just using .env vars
mongoose.connect(process.env.mongoUrl);

// On Connection

// process.on('message', async(msg) => {
//     try{
//         await mongoose.connection.on('connected', () => {
//             console.log('Connected to Database '+ process.env.mongoUrl);
//           });
//         const sum = await scrapeBinance();
//         process.send(sum);
//     }catch(err){
//         console.log(err);
//         next(err);
//     }

// });

const run = async () => {
  try {
    //wait for mongoose connection
    await mongoose.connection.on("connected", () => {
      console.log("Connected to Database " + process.env.mongoUrl);
    });

    //wait for result
    let result = await scrapeBinanceExchangeInfo();
    return result;

  } catch (err) {
    console.log(err);
    next(err);
  }
};



const scrapeBinanceExchangeInfo = async () => {
  try {
    const url = "https://api.binance.com/api/v1/exchangeInfo";
    const response = await axios.get(url);
    const data = response.data;

    return data;

  }catch(err) {
    console.log(err);
    next(err);
  }
};

let res = run().then((res)=>{
    console.log(res);
    return res;
}).then(()=>{
    mongoose.connection.close();
})
.catch((err)=>{
    console.log(err);
})



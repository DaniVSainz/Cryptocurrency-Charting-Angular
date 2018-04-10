require('dotenv').config()
const axios = require("axios");
const CryptoCurrency = require("../models/cryptoCurrency");
const Exchange = require("../models/exchange");
const Market = require('../models/market');

const fs = require("fs");
const mongoose = require("mongoose");

mongoose.Promise = require("bluebird");
// mongoose.connect(process.env.mongoUrl);
mongoose.connect("mongodb://localhost:27017/cryptoNalysisApi");


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
  }
};



const scrapeBinanceExchangeInfo = async () => {
  try {
    const url = "https://api.binance.com/api/v1/exchangeInfo";
    const response = await axios.get(url);
    const data = response.data;

    let exchange = await Exchange.binance();

    let pairs = data.symbols;
    let pair;
    let currentMarket;
    let referenceCoin;

    for(let i=0;i<pairs.length;i++){
      //Binance api has fake data in prod... skip this symbol

      if(pairs[i].symbol != "123456"){
        pair = pairs[i];
        currentMarket = await Market.find({symbol:pair.quoteAsset, exchange_id:exchange._id});
        console.log(currentMarket);

        //If exchange dosent have a market create it.
        if(currentMarket.length==0){
          referenceCoin = await CryptoCurrency.findOne({symbol:pair.quoteAsset});

          currentMarket = new Market({
            name:referenceCoin.name,
            symbol:referenceCoin.symbol,
            exchange_id:exchange._id
          });

          currentMarket = await currentMarket.save();
          
          
        }
      }
    }
    return exchange;
  }catch(err) {
    console.log(err);
  }
};


run().then((exchange)=>{
  console.log(exchange)
  mongoose.connection.close((res)=>{
    console.log('Connection Closed')
  })
})



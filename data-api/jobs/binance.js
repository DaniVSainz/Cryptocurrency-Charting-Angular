const axios = require("axios");
const CryptoCurrency = require("../models/cryptoCurrency");
const Exchange = require("../models/exchange");
const Market = require('../models/market');
const Pair = require('../models/pair');
const Day = require('../models/day');
require('dotenv').config()


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
    let result = await scrapeDays();;

    return result;

  } catch (err) {
    console.log(err);
  }
};


//This function saves all the exchanges pair listings to our db To later run a script that hits their historical data from this list.
const scrapeBinanceExchangeInfo = async () => {
  try {
    const url = "https://api.binance.com/api/v1/exchangeInfo";
    const response = await axios.get(url);
    const data = response.data;

    let exchange = await Exchange.binance();

    let responsePairs = data.symbols; // all the coins in the response from exchange
    let responsePair; // current response pair
    let currentMarket; //current market pair data will be saved to
    let quoteAsset; // quote asset reference cryptocurrency
    let baseAsset; //base asset reference cryptocurrency
    let pairInDb; // check if the pair exists or create one. later this will be used to get _Id to save days to

    for(let i=0;i<responsePairs.length;i++){
      //Binance api has fake data in prod... skip this symbol
      responsePair = responsePairs[i];
      if(responsePair.symbol != "123456"){

        currentMarket = await Market.find({symbol:responsePair.quoteAsset, exchange_id:exchange._id});

        //If exchange dosent have a market create it.
        if(currentMarket.length==0){
          quoteAsset = await CryptoCurrency.findOne({symbol:responsePair.quoteAsset});
          //create new market since we did not have a market for it
          currentMarket = new Market({
            name:quoteAsset.name,
            symbol:quoteAsset.symbol,
            exchange_id:exchange._id
          });
          //save the market
          currentMarket = await currentMarket.save();
          //push ref onto market incase we ever want to populate
          exchange.markets.push(currentMarket._id);
          exchange = await exchange.save();


        //We have a market to add pairs to.
        }else if(currentMarket.length == 1){
          //set current market for easier referencing.
          currentMarket=currentMarket[0];

          //Now we would check if a pair exists for that cryptoCurrency.
          pairInDb = await Pair.findOne({symbol:responsePair.baseAsset, market_id:currentMarket._id});
          if(pairInDb==undefined){
            //Check if we have the responses pair cryptocurrency's(baseAsset) in our database to save a name to it since its not returned from exchange api
            baseAsset = CryptoCurrency.findOne({symbol:responsePair.baseAsset});
            pairInDb = new Pair({
              symbol: responsePair.baseAsset,
              quote_asset: responsePair.quoteAsset,
              market_id: currentMarket._id,
              pair: responsePair.symbol
            });

            if(baseAsset != null) pairInDb.name = baseAsset.name;
            
            pairInDb = await pairInDb.save();
            // console.log(`Saved ${pairInDb.pair}`);
          }
        //This would mean we found multiple markets which should not occur.
        }else{
          throw Error('Found duplicates when it should have not occured, create validation');
        }
      }
    }
    return exchange;
  }catch(err) {
    console.log(err);
  }
};


//This function will get a list of all Binance's pair and scrape data from the api for each one.
const scrapeDays = async () =>{
  console.log('Begin Scrape Days');
  let exchange = await Exchange.findOne({name:'Binance'});
  let markets = await Market.find({exchange_id:exchange._id});
  let pairs;
  let pair;

  let url;
  let response;
  let responseDay;
  let data;
  let day;
  let date;
  let skipCount;
  let saved = 0;


  //go through each of binances markets ie BTC/ETH/USDT/BNB then get all of the pairs against that market and get the current data from the api.
  for(let i=0;i < markets.length;i++){
    //Get the pairs for the market
    pairs = await Pair.find({market_id:markets[i]._id});
    //Go through each pair, get response from the api for that pair, seed the db with the days data.
    for(let i=0;i< pairs.length;i++){
      pair = pairs[i];
      url = `https://api.binance.com/api/v1/klines?symbol=${pair.pair}&interval=1d`
      response = await axios.get(url);
      data = response.data;
      skipCount = 0;
      for(let i = data.length -1 ;i >= 0; i--){
        responseDay=data[i]
        date = new Date(responseDay[0]);
        date = date.toISOString().slice(0,10);
        day = await Day.findOne({date:date, pair_id:pair._id});
        //If the day dosent exist create it
        if(day==undefined){
          day = new Day({
            date:date,
            openEpoch:responseDay[0],
            openingPrice:responseDay[1],
            highestPrice:responseDay[2],
            lowestPrice:responseDay[3],
            closingPrice:responseDay[4],
            totalVolume:responseDay[5],
            closeEpoch:responseDay[6],
            totalVolumeQuoteAsset:responseDay[7],
            totalTrades:responseDay[8],
            pair_id: pair._id
          })
          //save the day
          day = await day.save();
          console.log(`Day saved ${day.date}`);
          saved ++;
        }else if(day && skipCount < 2 ){
          day.openEpoch = responseDay[0];
          day.openingPrice = responseDay[1];
          day.highestPrice = responseDay[2];
          day.lowestPrice = responseDay[3];
          day.closingPrice = responseDay[4];
          day.totalVolume = responseDay[5];
          day.closeEpoch = responseDay[6];
          day.totalVolumeQuoteAsset = responseDay[7];
          day.totalTrades = responseDay[8];
          day = await day.save();
          skipCount ++;
          console.log(`Pair: ${pair.symbol} Day updated ${day.date} Skip count = ${skipCount}`)
        }else{
          break;
        }
      }
    }
  }
  return saved;
}


run().then((result)=>{
  console.log(result);
  mongoose.connection.close((res)=>{
    console.log('Connection Closed');
  });
})



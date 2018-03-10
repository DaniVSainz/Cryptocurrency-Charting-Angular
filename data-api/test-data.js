const mongoose = require('mongoose');
require('dotenv').config()
const Exchange = require('./models/exchange');
const CryptoCurrency = require('./models/cryptoCurrency');


mongoose.Promise = require('bluebird');
// // Use q. Note that you **must** use `require('q').Promise`.
// mongoose.Promise = require('q').Promise;

//Read Mongoose.connect below
// // Connect To Database 
// mongoose.connect(config.database);

//Or USE this instead to connect to db if you rather use .env variables
//Works easier with deploys and git not having to change stuff and just using .env vars
mongoose.connect(process.env.mongoUrl);


// On Connection


mongoose.connection.on('connected', () => {
  console.log('Connected to Database '+ process.env.mongoUrl);
});


// On Error
mongoose.connection.on('error', (err) => {
  console.log('Database error '+err);
});

// const foo = async () =>{
//   try{
//     let exchange = new Exchange({
//       name: 'CoinMarketCap'
//     })

//     await exchange.save(
//       err=>{
//         console.log(err);
//       },exchange =>{
//         console.log(`Save ${exchange.name}`);
//       }
//     )

//   }catch (err){

//   }
// }

// foo();



// async () =>{
//   try{
//     let exchange = await Exchange.findOne({name:'CoinMarketCap'});
//     console.log(`Exchange name is ${exchange.name}`);
//   }catch(err){

//   }
// }


// const foo = async()=>{
//   try {
//     let exchange = await Exchange.findOne({name:'CoinMarketCap'});
//     exchange.
//   } catch (error) {
    
//   }
// }

// foo();
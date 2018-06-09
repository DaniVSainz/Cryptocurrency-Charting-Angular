const express = require('express');
const router = express.Router();
const CryptoCurrency = require('../models/cryptoCurrency');
const Exchange = require('../models/exchange');
const Market = require('../models/market');
const Pair = require('../models/pair');
const Day = require('../models/day');



// router.get('/getpairdata/:symbol', async (req,res,next) => {
//     try{
//         let pairParam = req.params.symbol.toUpperCase();
//         let pairs = await Pair.find({symbol:pairParam});
//         let pair;
//         let cryptoCurrency = await CryptoCurrency.findOne({symbol:pairParam});
//         let days;
//         console.log(pairs);
//         if (pairs.length >= 0){
//             for (let i =0;i<pairs.length;i++){
//               console.log('====================================');
//               console.log(`${i}`,pairs[i].quote_asset);
//               console.log('====================================');
//                 if(pairs[i].quote_asset=='USDT'){
//                     pair = pairs[i];
//                     break;
//                 }else if(pairs[i].quote_asset=='BTC'){
//                     pair = pairs[i];
//                 }else if(pairs[i].quote_asset=='ETH' && pair.quote_asset=='BNB'){
//                     pair = pairs[i];
//                 }else if (pairs[i].quote_asset=='ETH' && pair == undefined){
//                     pair = pairs[i];
//                 }
//             }
//             days = await Day.find({pair_id:pair._id}).sort('date').exec();
//             return res.status(200).send([{pair},{days},{cryptoCurrency}]);
//         }else{
//             return res.status(500).send({msg:'Sorry we dont have any historical data for that cryptocurrency'});
//         }        
//     }catch(err){
//         console.log(err);
//         next(err); 
//     }
// });
router.get('/getpairdata/:symbol/:quote_asset', async (req,res,next) => {
  try{
      //Route assets
      let pairParam = req.params.symbol.toUpperCase();
      let pairQuoteAsset = req.params.quote_asset.toUpperCase();
      console.log(`${pairParam}${pairQuoteAsset}`);

      let pairs = await Pair.find({symbol:pairParam});

      let pair = await Pair.findOne({symbol:pairParam, quote_asset: pairQuoteAsset });
      console.log(pair);
      let cryptoCurrency = await CryptoCurrency.findOne({symbol:pairParam});
      let days = await Day.find({pair_id:pair._id}).sort('date').exec();
        if(days){
          console.log(days.length)
          return res.status(200).send([{pair},{days},{cryptoCurrency}, {pairs}]);
        } else{
          return res.status(200).send({msg:'Sorry we dont have any historical data for that cryptocurrency'});
      }        
  }catch(err){
      console.log(err);
      next(err); 
  }
});

router.get('/getpairdata/:symbol', async (req,res,next) => {
  try{
      let pairParam = req.params.symbol.toUpperCase();
      let pairs = await Pair.find({symbol:pairParam});
      let pair = {
        quote_asset: 'BNB'
      }
      let cryptoCurrency = await CryptoCurrency.findOne({symbol:pairParam});
      let days;
      if (pairs.length >= 1){
          for (let i =0;i<pairs.length;i++){
              if(pairs[i].quote_asset=='USDT'){
                  pair = pairs[i];
                  break;
              }else if(pairs[i].quote_asset=='BTC'){
                  pair = pairs[i];
              }else if(pairs[i].quote_asset=='ETH' && pair.quote_asset=='BNB'){
                  pair = pairs[i];
              }else if (pairs[i].quote_asset=='ETH' && pair.quote_asset=='BNB'){
                  pair = pairs[i];
              }
          }
          days = await Day.find({pair_id:pair._id}).sort('date').exec();
          return res.status(200).send([{pair},{days},{cryptoCurrency},{pairs}]);
      }else{
          return res.status(200).send({msg:'Sorry we dont have any historical data for that cryptocurrency'});
      }        
  }catch(err){
      console.log(err);
      next(err); 
  }
});

module.exports = router;





const express = require('express');
const router = express.Router();
const CryptoCurrency = require('../models/cryptoCurrency');
const Exchange = require('../models/exchange');
const Market = require('../models/market');
const Pair = require('../models/pair');
const Day = require('../models/day');



router.get('/getpairdata/:symbol', async (req,res,next) => {
    try{
        let pairParam = req.params.symbol.toUpperCase();
        let pair = await Pair.find({symbol:pairParam});
        let cryptoCurrency = await CryptoCurrency.findOne({symbol:pairParam});
        let days;
        if (pair.length >= 1){
            days = await Day.find({pair_id:pair[0]._id}).sort('date').exec();
            return res.status(200).send([{pair},{days},{cryptoCurrency}]);
        }else{
            return res.status(500).send({msg:'Sorry we dont have any historical data for that cryptocurrency'});
        }        
    }catch(err){
        console.log(err);
        next(err); 
    }
});


module.exports = router;



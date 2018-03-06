const express = require('express');
const router = express.Router();
const axios = require("axios");
const url = "https://api.coinmarketcap.com/v1/ticker/";
const CryptoCurrency = require('../models/cryptoCurrency');

router.get('/getall', async (req,res,next) => {
    try{
        const response = await axios.get(url);
        console.log(response.data);
        const data = response.data;
        let counter = 0;
        data.forEach(element => {
            let coin = new CryptoCurrency({
                name: element.name,
                symbol: element.symbol,
                rank: element.rank,
                price_usd: element.price_usd,
                price_btc: element.price_btc,
                '24h_volume_usd': element['24h_volume_usd'],
                market_cap_usd: element.market_cap_usd,
                available_supply: element.available_supply,
                total_supply: element.total_supply,
                max_supply: element.max_supply,
                percent_change_1h: element.percent_change_1h,
                percent_change_24h: element.percent_change_24h,
                percent_change_7d: element.percent_change_7d,
                last_updated: element.last_updated 
                });
            coin.save(err=>{
                if (err) console.log(err);
            });
        });
        res.status(200).send({text:"finished"});
    }catch(err){
        next(err)
    }
});

module.exports = router;

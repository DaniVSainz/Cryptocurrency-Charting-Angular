const express = require('express');
const router = express.Router();
const axios = require("axios");
const CryptoCurrency = require('../models/cryptoCurrency');
const Exchange = require('../models/exchange');
const fs = require('fs');

router.get('/getall', async (req,res,next)=>{
    try{
        let data = await CryptoCurrency.find({},(err)=>{
            if (err) console.log(err);
        });
        if(data){
            res.status(200).json(data);
        }
    }catch(err){
        res.status(500).json(err);
        next(err);
    }
});

router.get('/scrape/:id', async (req,res,next) => {
    try{
        let exchange = await Exchange.findOne({name: req.params.id})
        const url = "https://api.coinmarketcap.com/v1/ticker/";
        const response = await axios.get(url);
        console.log(response.data);
        const data = response.data;
        let counter = 0;
        data.forEach(element => {
            element.rank = parseInt(element.rank);
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
                last_updated: element.last_updated,
                exchange_id: exchange._id,
                coin_exchange: (element.name + exchange.name).replace(/\s/g,'') 
                });
            coin.save(err=>{
                if (err) console.log(err);
                console.log(coin.name);
            });
        });
        res.status(200).send({text:"finished"});
    }catch(err){
        next(err)
    }
});

router.get('/coinmarketcap', async (req,res,next) => {
    try{
        let coinMarketCap = await Exchange.coinMarketCap();
        // const url = "https://api.coinmarketcap.com/v1/ticker/?limit=0";
        // const response = await axios.get(url);
        // const data = response.data;

        const response = fs.readFileSync('../testResponses/coinMarketCapTicker.json')
        let data = await JSON.parse(response);
        data = data;


        let counter = 0;
        let coin;
        let saved = 0;
        let i=0;
        for(i;i<data.length;i++){
            data[i].rank = parseInt(data[i].rank);
            
            coin = await CryptoCurrency.find({name:data[i].name, symbol:data[i].symbol});
            if(coin.length == 0){
                coin = new CryptoCurrency({
                    name: data[i].name,
                    symbol: data[i].symbol,
                    rank: data[i].rank,
                    price_usd: data[i].price_usd,
                    price_btc: data[i].price_btc,
                    '24h_volume_usd': data[i]['24h_volume_usd'],
                    market_cap_usd: data[i].market_cap_usd,
                    available_supply: data[i].available_supply,
                    total_supply: data[i].total_supply,
                    max_supply: data[i].max_supply,
                    percent_change_1h: data[i].percent_change_1h,
                    percent_change_24h: data[i].percent_change_24h,
                    percent_change_7d: data[i].percent_change_7d,
                    last_updated: data[i].last_updated,
                });
                coin.save(err=>{
                    if (err) console.log(err);
                    saved++;
                });
            }
        }
        
        
        res.status(200).send({
            saved:`Saved: ${saved} coins`,
            responseLength:`Response contained ${i} items`,
            lastItem:`Last item in response: ${data[i-1].name}`,
            firstItem:`First item in response: ${data[0].name}`
        })
    }catch(err){
        next(err)
    }
});

module.exports = router;



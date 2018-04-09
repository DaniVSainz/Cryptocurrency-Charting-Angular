const mongoose = require('mongoose');


const ExchangeSchema =  mongoose.Schema({
    name: {type: String, required: true, unique:true},
    volume_24h:{type:String}
},{timestamps:true});


ExchangeSchema.statics.coinMarketCap = async function(){
    let coinMarketCap = await Exchange.findOne({name: 'CoinMarketCap'});
    if (coinMarketCap == undefined){
        coinMarketCap = await Exchange.create({name: 'CoinMarketCap'}, (err,coinMarketCap)=>{
            if(err){throw Error(err)}
            coinMarketCap;
        });
    }
    return coinMarketCap
}

ExchangeSchema.statics.binance = async function(){
    let binance = await Exchange.findOne({name: 'Binance'});
    if (binance == undefined){
        binance = await Exchange.create({name: 'Binance'}, (err,coinMarketCap)=>{
            if(err){throw Error(err)}
            binance;
        });
    }
    return binance
}

const Exchange = module.exports = mongoose.model('Exchange', ExchangeSchema);

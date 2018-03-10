const mongoose = require('mongoose');

const CryptoCurrencySchema =  mongoose.Schema({
    name: {type: String, required: true, unique:true},
    symbol: {type: String, required: true},
    rank: {type: Number, required: true},
    price_usd: {type: String, required: true},
    price_btc: {type: String, required: true},
    '24h_volume_usd': {type: String},
    market_cap_usd: {type: String},
    available_supply: {type: String},
    total_supply: {type: String},
    max_supply: {type: String},
    percent_change_1h: {type: String},
    percent_change_24h: {type: String},
    percent_change_7d: {type: String},
    last_updated: {type: String},
    exchange_id: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Exchange' },
});

const CryptoCurrency = module.exports = mongoose.model('CryptoCurrency', CryptoCurrencySchema);
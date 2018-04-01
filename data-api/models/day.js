const mongoose = require('mongoose');

const DaySchema =  mongoose.Schema({
    date:{type:Date, required:true},
    openEpoch:{type:Number},
    openTime:{type:Date},
    openingPrice:{type:String},
    highestPrice:{type:String},
    lowestPrice:{type:String},
    closingPrice:{type:String},
    totalVolume:{type:String},
    closeEpoch:{type:Number},
    totalVolumeQuoteAsset:{type:String},
    totalTrades:{type:Number},
    closeTime:{type:Date},
    price_usd:{type:Number},
    changePercent:{type:Number},
    pair_id: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Pair' }
},{timestamps:true});

const Day = module.exports = mongoose.model('Day', DaySchema);
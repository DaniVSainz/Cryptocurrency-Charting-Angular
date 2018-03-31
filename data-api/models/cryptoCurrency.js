const mongoose = require('mongoose');

const CryptoCurrencySchema =  mongoose.Schema({
    name:{type: String, required: true},
    symbol:{type:String,required:true},
    // rank:{type:}
});

const CryptoCurrency = module.exports = mongoose.model('CryptoCurrency', CryptoCurrencySchema);
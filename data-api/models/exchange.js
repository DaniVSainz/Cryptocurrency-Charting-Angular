const mongoose = require('mongoose');


const ExchangeSchema =  mongoose.Schema({
    name: {type: String, required: true, unique:true},
    volume_24h:{type:String}
});

const Exchange = module.exports = mongoose.model('Exchange', ExchangeSchema);
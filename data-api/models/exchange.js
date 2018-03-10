const mongoose = require('mongoose');


const ExchangeSchema =  mongoose.Schema({
    name: {type: String, required: true, unique:true}
});

const Exchange = module.exports = mongoose.model('Exchange', ExchangeSchema);
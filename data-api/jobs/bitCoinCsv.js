require('dotenv').config()
const axios = require("axios");
const CryptoCurrency = require("../models/cryptoCurrency");
const Exchange = require("../models/exchange");
const fs = require("fs");
const mongoose = require("mongoose");
const parse = require("csv-parse");

mongoose.Promise = require("bluebird");
mongoose.connect(process.env.mongoUrl);

const saveToDb = async () => {
  try {
    await mongoose.connection.on("connected", () => {
      console.log("Connected to Database " + process.env.mongoUrl);
    });

    var parser = parse({delimiter: ','}, function(err, data){
        console.log(data[0]);
      });
      
      fs.createReadStream(__dirname+'/my-csv.csv').pipe(parser);
  } catch (error) {
      console.log(error);
  }
};

saveToDb();
const express = require('express');
const router = express.Router();
const axios = require("axios");
const url = "https://api.coinmarketcap.com/v1/ticker/";

router.get('/getall', async (req,res,next) => {
    try{
        const response = await axios.get(url);
        console.log(response.data);
        const data = response.data;
        let counter = 0;
        data.forEach(element => {
            counter++;
        });
        res.status(200).send({data,counter});
    }catch(err){
        next(err)
    }
});

module.exports = router;

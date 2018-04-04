require('dotenv').config();
let mongoose = require('mongoose');
let environment = process.env.mongoUrl;
let agenda=require('agenda');

mongoose.Promise = require('bluebird');

let promise=mongoose.connect(process.env.mongoUrl);


var jobTypes = process.env.JOB_TYPES ? process.env.JOB_TYPES.split(',') : [];

jobTypes.forEach(function(type) {
  require('./lib/jobs/' + type)(agenda);
})

if(jobTypes.length) {
  agenda.on('ready', function() {
    agenda.start();
  });
}

module.exports = agenda;
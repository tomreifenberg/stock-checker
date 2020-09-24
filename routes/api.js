/*
*
*
*       Complete the API routing below
*
*
*/

'use strict';

var expect = require('chai').expect;
let mongodb = require('mongodb')
let mongoose = require('mongoose')

module.exports = function (app) {
  
/* pulled connection key from mongodb cluster, added process.env.PW to connect to private password, and added name of mongodb element stock_price_checker*/  
  let uri = 'mongodb+srv://reifenberg:' + process.env.PW + '@cluster0.rn8u7.mongodb.net/stock_price_checker?retryWrites=true&w=majority'
  
  mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  
  let stockSchema = new mongoose.Schema({
    name: {type: String, required: true},
    likes: {type: Number, default: 0},
    ips: [String]
  })
  
  let Stock = mongoose.model('Stock', stockSchema)

  app.route('/api/stock-prices')
    .get(function (req, res){
      
    });
    
};

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

    let responseObject = {}
    responseObject['stockData'] = {}

		// Variable to determine number of stocks
    let twoStocks = false
  
    /* Output Response */
    let outputResponse = () => {
        return res.json(responseObject)
    }
    
    /* Find/Update Stock Document */
    let findOrUpdateStock = (stockName, documentUpdate, nextStep) => {
        Stock.findOneAndUpdate(
            {name: stockName},
            documentUpdate,
            {new: true, upsert: true},
            (error, stockDocument) => {
                if(error){
                console.log(error)
                }else if(!error && stockDocument){
                    if(twoStocks === false){
                      return nextStep(stockDocument, processOneStock)
                    }
                }
            }
        )
      
    }
    
    /* Like Stock */
    let likeStock = (stockName, nextStep) => {
      
    }
    
    /* Get Price */
    let getPrice = (stockDocument, nextStep) => {
      nextStep(stockDocument, outputResponse)
    }
    
    /* Build Response for 1 Stock */
    let processOneStock = (stockDocument, nextStep) => {
       responseObject['stockData']['stock'] = stockDocument['name']
        nextStep()
    }
    
    let stocks = []        
    /* Build Response for 2 Stocks */
    let processTwoStocks = (stockDocument, nextStep) => {
      
    }

		/* Process Input*/  
    if(typeof (req.query.stock) === 'string'){
      /* One Stock */
      let stockName = req.query.stock
      
      let documentUpdate = {}
      findOrUpdateStock(stockName, documentUpdate, getPrice)
      
    } else if (Array.isArray(req.query.stock)){
			twoStocks = true
      /* Stock 1 */

      /* Stock 2 */

    }
});
    
};

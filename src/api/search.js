var express = require("express");
var History = require( '../models/history').History;
var request = require("request");
var config = require("../../config.js");

var searchApi = express.Router(); //import the routes object


searchApi.get('/search/:query/:offset?', function(req, res, next) {
  var searchTerm = req.params.query;
  var date = Date.now();

  var start = req.params.offset || 3

  var cx = config.API_CX;
  var key = config.API_KEY;

  var url = `https://www.googleapis.com/customsearch/v1?key=${key}&cx=${cx}&q=${searchTerm}&start=${start}&searchType=image`

console.log('reqdot params', req.params)
  request(url, function(error, response, body) {
    // console.log('error:', error);
    // console.log('statusCode:', response && response.statusCode);
    // console.log('body:', body);
    var resultArr = JSON.parse(body).items;
    var formatted = resultArr.map(function(resultObj) {
      return showResults(resultObj);
    });

    res.send(formatted);

  // showResults function
  function showResults(resultObj) {

    return {
      title: resultObj.title,
      snippet: resultObj.snippet,
      url: resultObj.link

    }
  }

  // create instance of history
      return History.create({
        searchTerm: searchTerm,
        date: date
      })
      .then(function(history){
          console.log('in history create');
      })
      .catch(next);
    });
  });
//
searchApi.get("/latest", function (req, res, next) {
  History.findAll()
  .error(function(error) {
    console.log(error)
  })
  .then(function(results) {
    res.status(200).json(results);
  })
  .catch(next);
});


module.exports = searchApi;

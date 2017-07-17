
var http = require('http');
var server = http.createServer();
var models= require("./src/models/history");
var History = models.History;
var Promise = require('bluebird');

var bodyParser = require('body-parser');

var searchApi = require("./src/api/search");
var models= require("./src/models/history");
var History = models.History;


server.on('request', require('./app'));

Promise.all([
        History.sync({})
    ])
    .then(function () {
        server.listen(3001, function () {
            console.log('Server is listening on port 3001!');
        });
    })
    .catch(console.error);

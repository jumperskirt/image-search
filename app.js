

var express = require("express");
var app = express();
var bodyParser = require('body-parser');
var nunjucks = require('nunjucks');
var path = require('path');
var searchApi = require("./src/api/search");
var models= require("./src/models/history");
var History = models.History;

app.set('view engine', 'html');
app.engine('html', nunjucks.render);
app.use(express.static('views'));

app.use(express.static(path.join(__dirname, './views')));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api', searchApi);
app.get("/", function (req, res) {
  // res.render(__dirname + '/views/index.html')
res.render('index');
  // res.send(`to search! https://brawny-dime.me/api/search/{yourSEARCHterm}
  // to view search history! https://brawny-dime.me/api/search`);

});
app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).send(err.message);
});


module.exports = app;

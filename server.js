var express = require('express');
var app = express();
var fs = require('fs');
var path = require('path');
var bodyParser = require('body-parser');
//require router
var searchRouter = require('./routes/searchRoutes');

var favoritesRouter = require('./routes/favoritesRoutes');

var infoRouter = require('./routes/infoRoutes');
//define static path for static resources like js or css
app.use(express.static(path.join(__dirname, '/public')));
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

app.use('/', express.static(path.join(__dirname, 'public')));
//use express routing to define what each URL request does
//router sends request to controller methods which then handle the request
app.use('/favorites', favoritesRouter);

app.use('/search', searchRouter);

app.use('/info',infoRouter);

app.listen(3000, function() {
    console.log("Listening on port 3000");
});
var express = require('express');
var app = express();
var fs = require('fs');
var path = require('path');
var bodyParser = require('body-parser');
//require router
var searchRouter = require('./routes/searchRoutes');
// console.log(searchRouter)
var favoritesRouter = require('./routes/favoritesRoutes');
// console.log(favoritesRouter)
var infoRouter = require('./routes/infoRoutes');

app.use(express.static(path.join(__dirname, '/public')));
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

app.use('/', express.static(path.join(__dirname, 'public')));

app.use('/favorites', favoritesRouter);

app.use('/search', searchRouter);

app.use('/info',infoRouter);

app.listen(3000, function() {
    console.log("Listening on port 3000");
});
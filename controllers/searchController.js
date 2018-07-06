var request = require('request');
// Search OMDB for movie information
exports.search = function(req, res) {
    console.log(req.body);
    if (!req.body.term) {
        res.send("Error");
        return;
    }
    request({
        uri: 'http://www.omdbapi.com',
        qs: {
            apikey: 'e5e2e54',
            s: req.body.term
        }
    }).pipe(res);
    // res.send('You searched for: ' + req.body.term);
};
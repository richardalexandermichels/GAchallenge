var request = require('request');
// Search OMDB for movie information
exports.getInfo = function(req, res) {
    console.log(req.params.oid);
    if (!req.params.oid) {
        res.send("Error");
        return;
    }
    request({
        uri: 'http://www.omdbapi.com',
        qs: {
            apikey: 'e5e2e54',
            i: req.params.oid
        }
    }).pipe(res);
    // res.send('You searched for: ' + req.body.term);
};
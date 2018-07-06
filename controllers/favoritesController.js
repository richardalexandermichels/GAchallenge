var fs = require('fs');
// persist favorites
exports.favorite = function(req, res) {
    if (!req.body.name || !req.body.oid) {
        res.send("Error");
        return;
    }

    var data = JSON.parse(fs.readFileSync('./data.json'));
    console.log("The DATA: ", data)
    console.log(req.body)
    data[req.body.oid] = (req.body.name);
    fs.writeFile('./data.json', JSON.stringify(data), function(err) {
        if (!!err) {
            console.log("ERROR SAVING: " + err);
        }
    });
    res.setHeader('Content-Type', 'application/json');
    res.send(data);
};


exports.listFavorite = function(req, res) {
    console.log('hit');
    var data = JSON.parse(fs.readFileSync('./data.json', 'utf8')); 
    console.log(data)
    res.setHeader('Content-Type', 'application/json');
    res.send(data);
};
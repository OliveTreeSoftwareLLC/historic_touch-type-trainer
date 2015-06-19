var bodyParser = require("body-parser");
var express = require('express');
var watch = require('node-watch');
var ncp = require('ncp').ncp;
var path = require("path");
var app = express();

app.use(express.static('assets'));
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));

ncp.limit = 16;

watch('app', function (filename) {
    console.log(filename, ' changed.');
    var destName = path.join(__dirname, '..', 'public', filename.substring(3));
    ncp(filename, destName, function (err) {
        if (err) {
            return console.error(err);
        }
        console.log('Finished copying ' + filename + '!');
    });
});


app.get('/', function (req, res) {
    res.sendfile("index.html");
});
app.post('/login', function (req, res) {
    var user_name = req.body.user;
    var password = req.body.password;
    console.log("User name = " + user_name + ", password is " + password);
    res.end("yes");
});

var server = app.listen(4000, function () {

    var host = server.address().address;
    var port = server.address().port;

    console.log('Touch-type-trainer server listening at http://localhost:%s', port);

});
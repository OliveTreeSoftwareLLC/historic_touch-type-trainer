var express = require('express');
var compression = require('compression');
var path = require('path');
var http = require('http');
var log = require('npmlog');
var WebSocket = require('faye-websocket');
var without = require('lodash/array/without');

var output = path.join(path.dirname(__dirname), 'output', 'dist');
var example = path.join(path.dirname(__dirname), 'output', 'example');

module.exports = Server;

function Server() {
    this.app = express();
    this.server = http.createServer(this.app);
    this.server.on('upgrade', this.upgrade.bind(this));

    this.app.use(compression());

    this.app.get('/output/', function(req, resp) {
        resp.redirect('/');
    });

    this.app.use(express.static(output));
    this.app.use('/example', express.static(example));

    this.connections = [];

    var port = process.env.PORT || process.env.CLIENT_BUILD_PORT || 8000;
    log.verbose('server', 'starting on port %s', port);
    this.server.listen(port);
}

Server.prototype.reload = function() {
    this.connections.forEach(function(c) {
        c.send('reload', function() { });
    });
};

Server.prototype.upgrade = function(req, socket, body) {
    if (WebSocket.isWebSocket(req))
        this.connect(new WebSocket(req, socket, body));
};

Server.prototype.connect = function(c) {
    log.verbose('server', 'client connected to live reload');

    this.connections.push(c);
    c.on('close', function() {
        log.verbose('client disconnected from live reload');
        this.connections = without(this.connections, c);
    }.bind(this));
};

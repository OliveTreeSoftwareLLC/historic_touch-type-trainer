var path = require('path');
var mkdirp = require('mkdirp');
var eachAsync = require('each-async');
var mapAsync = require('map-async');
var fork = require('child_process').fork;
var log = require('npmlog');

var workers = [
    './assets',
    './eslint',
    './webpack',
    './rework',
    './lint',
    './test',
    './example'
].map(require.resolve);

function Runner() {
    this.workers = workers.map(startWorker);
    this.failing = false;
}

Runner.prototype.run = function(files, cb) {
    if (typeof files === 'function') {
        cb = files;
        files = [];
    }

    mkdirp.sync('output/dist');
    mapAsync(this.workers,
        function(w, i, cb) { runWorker(w, files, cb); },
        done);

    function done(err, results) {
        if (err) return cb(err);
        if (results.some(function(s) { return !s; }))
            return cb(new Error('build failed'));
        cb();
    }
};

Runner.prototype.end = function(cb) {
    eachAsync(this.workers, endWorker, cb);
};

function startWorker(w) {
    var proc = fork(w);
    var name = path.basename(w, '.js');
    log.verbose('runner', 'starting %s', name);

    proc.on('exit', function(c) {
        log.verbose('runner', '%s exited', name);
        if (c !== 0)
            log.error('runner', '%s crashed', name);
    });

    return { proc: proc, name: name };
}

function runWorker(w, files, cb) {
    var proc = w.proc;

    log.verbose('runner', 'running %s', w.name);

    proc.once('message', function(m) {
        log.verbose('runner', '%s done', w.name);
        cb(null, m.result === 'success');
    });

    proc.send({ build: true, files: files });
}

function endWorker(w, i, cb) {
    var proc = w.proc;

    log.verbose('runner', 'ending %s', w.name);
    proc.once('exit', function() { cb(); });
    proc.send({ quit: true });
}

module.exports = Runner;

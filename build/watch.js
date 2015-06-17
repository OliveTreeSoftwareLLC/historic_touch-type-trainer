var _ = require('lodash');
var path = require('path');
var chokidar = require('chokidar');
var log = require('npmlog');
var Server = require('./server');

var root = path.dirname(__dirname);

module.exports = watch;

function watch(runner) {
    var opts = {
        ignored: ignore,
        persistent: true,
        ignoreInitial: true
    };

    var server = new Server();

    var w = chokidar.watch(root, opts);
    var running = false;
    var files = [];
    var start = _.debounce(build, 200);

    w.on('all', function(e, file) {
        log.verbose('watch', '%s: %s', e, file);
        files.push(file);
        start();
    });

    build();

    function build() {
        if (running) return;
        running = true;
        log.info('watch', '[%s] starting build', timestamp());
        runner.run(files, built);
        files = [];
    }

    function built(err) {
        if (err)
            log.error('watch', '[%s] build failed ', timestamp());
        else
            log.info('watch', '[%s] build succeeded', timestamp());

        running = false;
        if (files.length > 0)
            build();
        else
            server.reload();
    }
}

function ignore(p) {
    if (path.basename(p) === '.gitignore')
        return true;

    p = path.relative(root, p);
    p = p.split(path.sep);
    var dir = p.shift();
    if (dir === '.')
        dir = p.shift();

    return dir === 'node_modules' || dir === 'output' || dir === '.git';
}

function timestamp() {
    return new Date().toLocaleTimeString();
}

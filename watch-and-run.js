var fs = require('fs');
var exec = require('child_process').exec;
var debounce = require('lodash').debounce;

var folder = process.argv[2].replace(/\/?$/, "/"); // ensure ending slash
var command = process.argv[3];

fs.watch(folder, debounce(function (event, filename) {
    console.log('File changed, running command: ' + command + ' ...');

    var run = exec(command)
    run.stdout.pipe(process.stdout)
    run.stderr.pipe(process.stderr)

    run.on('close', function() { console.log('done.\n'); });
}, 50));

console.log('Watching "' + folder + '" and will run "' + command + '" on change.\n');
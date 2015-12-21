'use strict';

var SunCalc = require('suncalc'),
    moment = require('moment-timezone'),
    debug = require('debug')('at-suncalc:register'),
    exec = require('child_process').exec;

var DRY_RUN = false;

exports.execute = function execute(config){

    DRY_RUN = config.dryRun;

    var reference = new Date(config.date);

    debug('Reference date: %s', reference);

    var times = SunCalc.getTimes(reference, config.lat, config.lon);


    var sunrise = moment(times.sunrise),
        sunriseDate = sunrise.tz(config.timezone).format('HH:mm MMM D');

    if(sunrise.isAfter(config.date)){
        debug('=> sunrise: %s', sunriseDate);
        at(sunriseDate, getpath(config.jobPath, config.sunrise));
    } else debug('=> sunrise if before now. We are not registering the job.');

    var sunset = moment(times.dusk),
        sunsetDate = sunset.tz('America/New_York').format('HH:mm MMM D');

    if(sunset.isAfter(config.date)){
        debug('=> sunset: %s', sunsetDate);
        at(sunsetDate, getpath(config.jobPath, config.sunset));
    } else debug('=> sunset if before now. We are not registering the job.');
};

function at(date, filepath){
    //TODO: Make -m so that we mail errors. We have to setup mail thou.
    var cmd = '/usr/bin/at -f ' + filepath + ' ' + date;

    debug('\t%s', cmd);

    if(DRY_RUN) return debug('\t%s', 'dry-run: exit'); //should this we console.log?

    exec(cmd, function(err, stdout, stderr){

        var message = '-----------------------------------------\n';
        message += '[' + (new Date()) + '] \n';
        if(stdout) message += 'stdout: ' + stdout + '\n';
        if(stderr) message += 'stderr: ' + stderr + '\n';

        if(err) message += 'exec error: ' + err.message + '\n';

        log(message);

    });
}

function getpath(filepath, action){
    var resolve = require('path').resolve,
        join = require('path').join;

    filepath = filepath ? filepath : resolve(__dirname, '../scripts');

    return join(filepath, action);
}


function log(message){
    debug(message);
    var logpath = require('path').join(__dirname, 'at-suncalc-date.log');
    require('fs').appendFileSync(logpath, message);
}

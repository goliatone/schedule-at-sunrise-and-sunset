var SunCalc = require('suncalc');
var moment = require('moment-timezone');
var exec = require('child_process').exec;

var DRY_RUN = false;

exports.execute = function execute(config){

    DRY_RUN = config.dryRun;

    var reference = new Date(config.date);

    console.log('Reference date:');
    console.log(config.date);
    console.log(reference);

    var times = SunCalc.getTimes(reference, config.lat, config.lon);


    var sunrise = moment(times.sunrise),
        sunriseDate = sunrise.tz(config.timezone).format('HH:mm MMM D');

    if(sunrise.isAfter(config.date)){
        console.log('=> sunrise', sunriseDate);
        at(sunriseDate, getpath('sunrise'));
    } else console.log('=> sunrise if before now. We are not registering the job.');

    var sunset = moment(times.dusk),
        sunsetDate = sunset.tz('America/New_York').format('HH:mm MMM D');

    if(sunset.isAfter(config.date)){
        console.log('=> sunset', sunsetDate);
        at(sunsetDate, getpath('sunset'));
    } else console.log('=> sunset if before now. We are not registering the job.');
};

function at(date, filepath){
    //TODO: Make -m so that we mail errors. We have to setup mail thou.
    var cmd = '/usr/bin/at -f ' + filepath + ' ' + date;
    console.log(cmd);

    if(DRY_RUN) return console.log('dry-run: exit');

    exec(cmd, function(err, stdout, stderr){

        var message = '-----------------------------------------\n';
        message += '[' + (new Date()) + '] \n';
        if(stdout) message += 'stdout: ' + stdout + '\n';
        if(stderr) message += 'stderr: ' + stderr + '\n';

        if(err) message += 'exec error: ' + err.message + '\n';

        log(message);

    });
}

function getpath(action){
    var resolve = require('path').resolve,
        join = require('path').join;

    return join(resolve(__dirname, '../scripts'), action);
}


function log(message){
    console.log(message);
    var logpath = require('path').join(__dirname, 'at-suncalc-date.log');
    require('fs').appendFileSync(logpath, message);
}

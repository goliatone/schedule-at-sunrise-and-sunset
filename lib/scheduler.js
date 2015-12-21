'use strict';

var debug = require('debug')('at-suncalc:scheduler');

exports.execute = function execute(config){
    require('crontab').load(function(err, crontab){

        //TODO: assert

        debug('********************************');
        debug('id:', config.id);
        debug('command:', config.command);
        debug('options:', config.opts);
        debug('when:', config.when);
        debug('comment:', config.comment);
        debug('********************************');

        var identifier = 'SCHEDULER: ' + config.id + ' ::',
            jobs = crontab.jobs({comment: new RegExp('^' + identifier)}),
            cmd = config.command + (config.opts ?  ' ' + config.opts : '');

        if(jobs.length){
            debug('Process already registered:');
            jobs.map(function(job){
                debug(job.toString());
            });
            process.exit();
        }

        if(config.dryRun){
            debug(config.when, cmd, '#', identifier + ' ' + config.comment);
            debug('Dry run. Exit');
            process.exit();
        }

        var job = crontab.create(cmd, config.when, identifier + ' ' + config.comment);

        crontab.save(function(err, ctr){
            if(err) {
                console.error('ERROR', err.message);
                debug(err.toString());
                debug(err);
            }
        });
    });
};

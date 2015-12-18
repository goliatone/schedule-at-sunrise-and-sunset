
exports.execute = function execute(config){
    require('crontab').load(function(err, crontab){

        //TODO: assert

        console.log('********************************');
        console.log('id', config.id);
        console.log('command', config.command);
        console.log('when', config.when);
        console.log('comment', config.comment);
        console.log('********************************');

        var identifier = 'SCHEDULER: ' + config.id + ' ::';

        var jobs = crontab.jobs({comment:new RegExp('^' + identifier)});

        if(jobs.length){
            console.warn('Process already registered:');
            jobs.map(function(job){
                console.warn(job.toString());
            });
            process.exit();
        }

        var job = crontab.create(config.command, config.when, identifier + ' ' + config.comment);

        crontab.save(function(err, ctr){
            if(err) console.error('ERROR', err);
        });
    });
};

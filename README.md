# at-suncalc
Schedule jobs to be run every day at sunrise and sunset.

This library will schedule a `cron` job to run every day. That job then calculates the time for sunrise and sunset and registers two `at` jobs. Each job will then call a script which can be configured. 

### Getting started

```
$ npm i -g schedule-at-sunrise-and-sunset
```

### Default script path 

On `postintall` this package will create the directory `/usr/local/opt/at-sun` where the current sample scripts provided with the repo will be installed.

You can replace those scripts with your own, or when you register an `at-suncalc` job, provide the arguments to the scheduler.

```
$ at-scheduler --now -- --sunrise start-hue-facade --sunset stop-hue-facade
```

The previous command will use `start-hue-facade` as the sunrise script, and `stop-hue-facade` as the sunset script. If you want to place your scripts in a different location, provide the `--job-path` option.

```
$ at-scheduler --now -- --job-path /opt/at-scripts
```

Make sure that your user has permissions to execute scripts in that directory.

### Documentation

The module consists of two scripts:
- `at-suncalc-date`
- `scheduler`

#### at-suncalc-date

#### scheduler

The scheduler registers the `cron` job that will be responsible of registering the daily `at` sunset and `at` sunrise jobs.

Schedule configuration:

```js
module.exports = {
    id: 'hue-facade-test',
    command: join(process.cwd(), 'bin', 'at-suncalc-date'),
    when: '58 23 * * *',
    comment: 'Scheduler for sunrise/sunset actions.'
};
```

#### scheduler options

##### id 
String used to identify the `cron` job. You can see it on the `crontab`. (i.e. using EDITOR=nano crontab -e)


##### command

The actual script that should be run. By default will be `at-suncalc-date`. When calling `scheduler` from the terminal, any arguments after the `--` will be passed to the `command` script.

##### when

When should the `cron` job run? By default is every day at **23:58** and it will set the reference date to perform the sun calculations to "the next day, start of day".

##### comment
String used to comment the `cron` job. You can see it on the `crontab`. (i.e. using EDITOR=nano crontab -e)

Execute scripts found at:
`/usr/local/opt/at-sun`

Wed Dec 16 23:22:00 2015-12-14

#### at
If you are on a Mac and you have not done this before, you need to enable the `atrun` daemon.

From a terminal window:
```
$ sudo launchctl load -w /System/Library/LaunchDaemons/com.apple.atrun.plist
```

You can list your current queued jobs and their corresponding id with `at -l`, and to remove any job just `atrm <job-id>`.

For more information, use `man at`.


#### crontab

You might want to edit your `crontab` to include the `$PATH`s you need.

```
EDITOR=nano crontab -e
```

Then add the following:

```
PATH=/usr/local/sbin:/usr/local/bin:/sbin:/bin:/usr/sbin:/usr/bin
```

If you don't then your shebangs might fail:

```
#!/usr/bin/env node
```

You might get `mail` stating that:
>env: node: No such file or directory 




<!--
Install script:
- register cron job, executes daily at 11:59PM
- cron job registers executes two `at` jobs
    - suncalc: sunset|dusk
    - each job executes it's own command
-->

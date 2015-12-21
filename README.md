
Install script:
- register cron job, executes daily at 11:59PM
- cron job registers executes two `at` jobs
    - suncalc: sunset|dusk
    - each job executes it's own command


sudo launchctl load -w /System/Library/LaunchDaemons/com.apple.atrun.plist

Wed Dec 16 23:22:00 2015

Execute scripts found at:
`/usr/local/opt/at-sun`


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

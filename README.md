
Install script:
- register cron job, executes daily at 11:59PM
- cron job registers executes two `at` jobs
    - suncalc: sunset|dusk
    - each job executes it's own command


sudo launchctl load -w /System/Library/LaunchDaemons/com.apple.atrun.plist

Wed Dec 16 23:22:00 2015

Execute scripts found at:
`/usr/local/opt/at-sun`

/**
 * http://www.cronmaker.com
 */
var join = require('path').join,
    resolve = require('path').resolve;

module.exports =
{
    id: 'sunset-sunrise-test',
    command: join(process.cwd(), 'bin', 'at-suncalc-date'),
    when: '58 23 * * *', //23:58:00
    comment: 'Scheduler for sunrise/sunset actions.'
};

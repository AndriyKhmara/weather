'use strict';

var fs = require('fs');

var SEPARATOR = ' | ';
var ENDLINE = "\r\n";

module.exports = function (path, isDebugModeOn) {

    var getCurrentTime = function () {
            var now = new Date();
            return [
                now.getUTCFullYear(),
                '-',
                now.getUTCMonth() + 1,
                '-',
                now.getUTCDate(),
                ' ',
                now.getUTCHours(),
                ':',
                now.getUTCMinutes(),
                ':',
                now.getUTCSeconds()
            ].join('');
        },

        writeMessageToFile = function (message) {
            console.log(message);
            fs.writeFile(path, message, { encoding: 'utf8', flag: 'a+'}, function (err) {
                if (err) {
                    throw {
                        'message': 'Failed to write log'
                    };
                }
            });
        },

        logError = function (message) {
            writeMessageToFile('ERROR' + SEPARATOR + getCurrentTime() + SEPARATOR + message + ENDLINE);
        },

        logWarning = function (message) {
            writeMessageToFile('WARNING' + SEPARATOR + getCurrentTime() + SEPARATOR + message + ENDLINE);
        },

        logDebug = function (message) {
            if (isDebugModeOn) {
                writeMessageToFile('DEBUG' + SEPARATOR + getCurrentTime() + SEPARATOR + message + ENDLINE);
            }
        },

        logInfo = function (message) {
            writeMessageToFile('INFO' + SEPARATOR + getCurrentTime() + SEPARATOR + message + ENDLINE);
        };

    return {
        logDebug: logDebug,
        logWaring: logWarning,
        logError: logError,
        logInfo: logInfo,
        getCurrentTime: getCurrentTime
    };
};

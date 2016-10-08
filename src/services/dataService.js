'use strict';

var request = require('request');

var url = 'http://api.openweathermap.org/data/2.5/weather?q=Rivne,ua&APPID=e9493cd95948c95df16a463acf42dac9';


request(url, function (error, response, body) {
    console.log(error);
    console.log('**********************************************************');
    console.log(response);
    console.log('**********************************************************');
    console.log(body);
    if (!error && response.statusCode === 200) {
        console.log(body); // Show the HTML for the Google homepage.

    }
});
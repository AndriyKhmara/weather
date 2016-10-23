'use strict';

var request = require('request');
var Logger = require('./services/logger.js');
var MongoClient = require('mongodb').MongoClient;

var cities = ['Rivne,ua', 'Kiev, UA', 'Lviv, UA'];


var urlDB = 'mongodb://localhost:27017/myproject';

var logger = new Logger('./logs/log.txt', false);

var getWeather = function (url) {
    request(url, function (error, response, body) {

        if (error) {
            logger.logError(error);
        }

        if (!error && response.statusCode === 200) {
            MongoClient.connect(urlDB, function (error, db) {
                if (error) {
                    logger.logError(error);
                }


                var collection = db.collection('weather');



                collection.insertOne({
                    data: JSON.parse(body).main,
                    time: JSON.parse(body).dt,
                    city: JSON.parse(body).name,
                    weather: JSON.parse(body).weather
                }, function (error, result) {
                    if (error) {
                        console.log(error);
                        logger.logError(error);
                    }
                    console.log(result);

                });


                db.close();
            });
        }
    });
};

setInterval(function () {

    cities.forEach(function (city) {
        var url = 'http://api.openweathermap.org/data/2.5/weather?q=' + city + '&APPID=e9493cd95948c95df16a463acf42dac9';
        getWeather(url);
    });



}, 7200000);



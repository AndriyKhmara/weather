'use strict';

var request = require('request');
var Logger = require('../services/logger.js');
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
                    main: JSON.parse(body).main,
                    wind: JSON.parse(body).wind,
                    clouds: JSON.parse(body).clouds,
                    weather: JSON.parse(body).weather,
                    time: JSON.parse(body).dt,
                    city: JSON.parse(body).name
                }, function (error, result) {
                    if (error) {
                        logger.logError(error);
                    }
                });


                db.close();
            });
        }
    });
};

module.exports = (function () {

    var initialize = function () {
        setInterval(function () {
            cities.forEach(function (city) {
                var url = 'http://api.openweathermap.org/data/2.5/weather?q=' + city + '&APPID=e9493cd95948c95df16a463acf42dac9';
                getWeather(url);
            });
        }, 7200000);
    };

    var updateWeather = function () {
        cities.forEach(function (city) {
            var url = 'http://api.openweathermap.org/data/2.5/weather?q=' + city + '&APPID=e9493cd95948c95df16a463acf42dac9';
            getWeather(url);
        });
        return "Weather successfully updated";
    };

    return {
        updateWeather: updateWeather,
        initialize: initialize
    }
})();
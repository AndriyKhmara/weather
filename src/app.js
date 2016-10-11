'use strict';

var request = require('request');
var Logger = require('./services/logger.js');
var MongoClient = require('mongodb').MongoClient;

var url = 'http://api.openweathermap.org/data/2.5/weather?q=Rivne,ua&APPID='; // Add your own ID after registration on openweathermap.org
var urlDB = 'mongodb://localhost:27017/myproject';

var logger = new Logger('./logs/log.txt', false);

setInterval(function () {

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
                // Insert some documents
                console.log(JSON.parse(body).main);
                console.log(collection);
                collection.insertOne(JSON.parse(body).main, function (error, result) {
                    if (error) {
                        logger.logError(error);
                    }
                    console.log(result);

                });


                db.close();
            });
        }
    });

}, 60000);

'use strict';

var express = require('express');
var bodyParser = require("body-parser");
var MongoClient = require('mongodb').MongoClient;
var weatherAPI = require('./models/weatherModel');
var logger = require('./services/logger.js');

var app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static('public'));


weatherAPI.initialize();


app.get('/citiesWeather', function (req, res) {
    MongoClient.connect('mongodb://localhost:27017/myproject', function (error, db) {
        if (error) {
            logger.logError(error);
        }
        var collection = db.collection('weather');

        console.log(collection.find().sort({$natural: -1}).limit(3).toArray(function (err, docs) {
            if (err) {
                logger.logError(error);
                docs = null;
            }
            res.send(docs);
        }));
        db.close();
    });
});

app.post('/cityWeather', function (req, res) {
    MongoClient.connect('mongodb://localhost:27017/myproject', function (error, db) {
        if (error) {
            console.log(error);
        }

        if (req.body.cityName) {
            var collection = db.collection('weather');
            console.log(req.body.cityName);
            console.log(collection.find({'city': req.body.cityName}).sort({$natural: -1}).limit(1).toArray(function (err, docs) {
                if (err) {
                    console.log(error);
                    docs = null;
                }
                res.send(docs);
            }));
            db.close();
        }
    });
});

app.post('/getDataForChart', function (req, res) {
    MongoClient.connect('mongodb://localhost:27017/myproject', function (error, db) {
        if (error) {
            console.log(error);
        }

        if (req.body.cityName) {
            var collection = db.collection('weather');
            console.log(req.body.cityName);
            console.log(collection.find({'city': req.body.cityName}).toArray(function (err, docs) {
                if (err) {
                    console.log(error);
                    docs = null;
                }
                res.send(docs);
            }));
            db.close();
        }
    });
});

app.post('/updateWeather', function (req, res) {
    res.send(weatherAPI.updateWeather());
});


app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});


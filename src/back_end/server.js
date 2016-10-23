'use strict';

var express = require('express');
var bodyParser = require("body-parser");
var MongoClient = require('mongodb').MongoClient;

var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'));
app.get('/citiesWeather', function (req, res) {


    MongoClient.connect('mongodb://localhost:27017/myproject', function (error, db) {
        if (error) {
            console.log(error);
        }
        var collection = db.collection('weather');

        console.log(collection.find().sort({ $natural: -1 }).limit(3).toArray(function (err, docs) {
            if (err) {
                console.log(err);
                docs = null;
            }
            res.send(docs);
        }));
        db.close();
    });
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});


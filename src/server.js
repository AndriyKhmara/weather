'use strict';

var express = require('express');
var bodyParser = require("body-parser");
var MongoClient = require('mongodb').MongoClient;

var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'));
app.get('/data', function (req, res) {
    MongoClient.connect('mongodb://localhost:27017/myproject', function (error, db) {
        if (error) {
            console.log(error);
        }
        var collection = db.collection('weather');
        /*
         * https://docs.mongodb.com/manual/reference/operator/query/
         * http://stackoverflow.com/questions/2008032/mongodb-query-with-an-or-condition
         */
        console.log(collection.find({
            $or: [
                {
                    humidity: {$lte: 50}
                },
                {
                    pressure: {$eq: 1003.93}
                }
            ]
        }).toArray(function (err, docs) {
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


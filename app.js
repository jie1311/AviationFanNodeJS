const express = require('express');
const mongo = require('mongodb');

const app = express();
const mongoClient = mongo.MongoClient;
const mongourl = 'mongodb://localhost:27017/';
const mongodb = 'airdbX';

const Aircraft = require('./Aircraft.js');
const Airport = require('./Airport.js');
const Output = require('./Output.js');

app.get('/getAircraft', function (req, res) {
   getAircraftFromDB(res);
});

app.get('/getAirport', function (req, res) {
    getAirportFromDB(res);
 });

app.listen(8080, function () {
    console.log('App listening on port 8080!');
    //initDB();
});

function initDB() {
    var aircrafts = [
        new Aircraft('Airbus', 'A350', '1000', 14800, 366),
        new Aircraft('Boeing', '777', '300ER', 13650, 365),
        new Aircraft('Boeing', '787', '9', 14140, 290)
    ];

    var airports = [
        new Airport('MEL', 'Melbourne', 144.843333, -37.673333),
        new Airport('SIN', 'Singapore', 103.989306, 1.359211),
        new Airport('LHR', 'London', -0.461389, 51.477500)
    ];

    mongoClient.connect(mongourl, { useNewUrlParser: true }, function (err, db) {
        if (err) throw err;
        var airdb = db.db(mongodb);

        airdb.createCollection('aircrafts', function (err, res) {
            if (err) throw err;
            console.log('Collection aircrafts created!');
            db.close();
        });

        airdb.collection('aircrafts').insertMany(aircrafts, function (err, res) {
            if (err) throw err;
            console.log('Number of aircrafts inserted: ' + res.insertedCount);
            db.close();
        });

        airdb.collection('aircrafts').find({}).toArray(function (err, result) {
            if (err) throw err;
            console.log(result);
            db.close();
        });

        airdb.createCollection('airports', function (err, res) {
            if (err) throw err;
            console.log('Collection airports created!');
            db.close();
        });

        airdb.collection('airports').insertMany(airports, function (err, res) {
            if (err) throw err;
            console.log('Number of airports inserted: ' + res.insertedCount);
            db.close();
        });

        airdb.collection('airports').find({}).toArray(function (err, result) {
            if (err) throw err;
            console.log(result);
            db.close();
        });
    });
}

function getAircraftFromDB(res) {
    mongoClient.connect(mongourl, { useNewUrlParser: true }, function (err, db) {
        if (err) throw err;
        var airdb = db.db(mongodb);

        airdb.collection('aircrafts').find({}).toArray(function (err, result) {
            if (err) throw err;
            res.send(new Output(true, '', result));
            db.close();
        });
    });
}

function getAirportFromDB(res) {
    mongoClient.connect(mongourl, { useNewUrlParser: true }, function (err, db) {
        if (err) throw err;
        var airdb = db.db('airdb4');

        airdb.collection('airports').find({}).toArray(function (err, result) {
            if (err) throw err;
            res.send(new Output(true, '', result));
            db.close();
        });
    });
}
'use-strict';

var express = require('express'),
    app = express(),
    path = require('path'),
    cons = require('consolidate'),
    MongoClient = require('mongodb').MongoClient,
    Server = require('mongodb').Server;

app.engine('html', cons.swig);
app.set('view engine', 'html');
app.set('views', path.join(__dirname, '/views'));

var mongoclient = new MongoClient(new Server('localhost', 27017));

var db = mongoclient.db('course');

app.get('/', function (req, res) {

    db.collection('test')
        .findOne({}, function (err, doc) {

            if (err) throw err;

            res.render('hello', doc);
        });

});

app.get('*', function (req, res) {
    res.status(404).send('Page not found');
});

mongoclient.open(function (err, mongoclient) {

    if (err) throw err;

    app.listen(8080, function () {
        console.log('Server running on localhost:8080');
    });

});

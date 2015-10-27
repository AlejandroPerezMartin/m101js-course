'use strict';

var MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/weather', function (err, db) {

    if (err) throw err;

    var data = db.collection('data');

    // var projection = { '_id': 1, 'State': 1, 'Temperature': 1 };
    var options = { 'sort' : [ ['State', 1], ['Temperature', -1] ] };

    var cursor = data.find({}, {}, options);

    var previous_state = '';
    var operator = { '$set' : { 'month_high' : true } };

    cursor.each(function (err, doc) {

            if (err) throw err;

            if (doc == null) {
                return;
            }

            if (doc.State != previous_state) {

                previous_state = doc.State;

                data.update({ '_id' : doc._id }, operator, function (err, updated){

                    if (err) throw err;

                    console.dir('Successfully updated ' + updated + ' document');

                });

            }

        });

});

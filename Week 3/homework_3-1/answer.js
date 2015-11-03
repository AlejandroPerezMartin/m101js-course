'use strict';

var MongoClient = require('mongodb')
    .MongoClient;

MongoClient.connect('mongodb://localhost:27017/school', function (err, db) {

    if (err) throw err;

    var students = db.collection('students');

    var cursor = students.find({});

    cursor.each(function (err, doc) {

        if (err) throw err;

        if (doc == null) {
            return;
        }

        var lowestIndex = -1;

        doc.scores.forEach(function (score, index, array) {
            if (score.type === 'homework') {

                if (lowestIndex === -1 || score.score <= doc.scores[lowestIndex].score) {
                    lowestIndex = index;
                }

            }
        });

        // Remove lowest score from scores array
        doc.scores.splice(lowestIndex, 1); // splice(index, howmany)

        students.update({
            '_id': doc._id
        }, {
            '$set': {
                'scores': doc.scores
            }
        }, function (err, updated) {

            if (err) throw err;

            console.dir('Successfully updated ' + updated + ' document');

        });
    });

});

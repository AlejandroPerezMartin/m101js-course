var MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/course', function (err, db) {

    if (err) throw err;

    var query = {
            'student': 'Frank',
            'assignment': 'hw1'
        },
        operator = {
            'student': 'Frank',
            'assignment': 'hw1',
            'grade': 100
        },
        // operator = { '$set' : {'date_returned': new Date(), 'grade': 100 } },
        options = {
            'upsert': true
        };

    db.collection('grades')
        .update(query, operator, options, function (err, upserted) {

            if (err) throw err;

            console.dir('Successfully upserted ' + upserted + ' document');

            db.close();
        });

});

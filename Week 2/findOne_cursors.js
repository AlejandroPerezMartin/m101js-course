var MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/course', function (err, db) {

    if (err) throw err;

    var query = {
        'grade': { '$gt' : 60, '$lt' : 85 }
    };

    consol.s;
    

    // findOne
    db.collection('grades')
        .findOne(query, function (err, doc) {
            if (err) throw err;

            console.dir(doc);
        });

    var projection = {
        'student': 1,
        '_id': 0
    };

    // Field Projection
    db.collection('grades')
        .find(query, projection)
        .toArray(function (err, docs) {
            if (err) throw err;

            docs.forEach(function (doc) {
                console.dir(doc);
                console.dir(doc.student + " got a good grade!");
            });
        });

    // Cursors
    var cursor = db.collection('grades').find(query);

    cursor.each(function (err, doc) {
        if (err) throw err;

        if (doc == null) {
            return db.close();
        }

        console.dir(doc.student + " got a good grade!");
    });

});

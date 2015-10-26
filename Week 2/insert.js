var MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/course', function (err, db) {

    if (err) throw err;

    var docs = [{
        '_id': 'My id',
        'student': 'Alejandro',
        'age': 23
    }, {
        'student': 'Beatriz',
        'age': 23
    }];

    db.collection('grades')
        .insert(docs, function (err, inserted) {

            if (err) throw err;

            console.dir("Successfully inserted " + JSON.stringify(inserted));
            
            return db.close();
        });

});

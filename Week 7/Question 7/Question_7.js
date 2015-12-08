// Final exam Question 7
// Answer is: 44,822

mongoimport - d photosharing - c albums albums.json
mongoimport - d photosharing - c images images.json

use photosharing;

db.albums.createIndex({
    'images': 1
});

var cursor = db.images.find();

cursor.forEach(function (doc) {
    var image_id = doc._id;
    var occurrences = db.albums.find({
            'images': image_id
        }).count();

    if (occurrences === 0) {
        db.images.remove({
            '_id': image_id
        });
    }
});

db.images.find({
        tags: 'kittens'
    }).count();

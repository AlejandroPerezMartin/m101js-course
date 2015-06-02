var express = require('express'),
    cons = require('consolidate'),
    MongoClient = require('mongodb').MongoClient,
    Server = require('mongodb').Server;

var app = express();

var port = 8080;

app.engine('html', cons.swig);

app.set('view engine', 'html');
app.set('views', __dirname + '/views');

var mongoclient = new MongoClient(new Server("localhost", 27017));
var db = mongoclient.db('m101');

app.get('/', function (req, res) {
    db.collection('hw1_1').findOne({}, function (err, doc) {
        res.render('hello', doc);
    });
});

app.get('*', function(req, res){
    res.send('Page not found', 404);
});

mongoclient.open(function (err, mongoclient) {
    if (err) throw err;
    app.listen(8080);
    console.log('Express server running on localhost:' + port);
});

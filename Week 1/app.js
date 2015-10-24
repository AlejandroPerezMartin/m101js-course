'use-strict';

var express = require('express'),
    app = express(),
    path = require('path'),
    cons = require('consolidate'),
    bodyParser = require('body-parser'),
    router = new express.Router(),
    MongoClient = require('mongodb').MongoClient,
    Server = require('mongodb').Server;

app.engine('html', cons.swig);
app.set('view engine', 'html');
app.set('views', path.join(__dirname, '/views'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(router);

var mongoclient = new MongoClient(new Server('localhost', 27017));

var db = mongoclient.db('course');

function errorHandler(err, req, res, next) {
    res.status(500);
    res.render('error_template', {
        error: err
    });
}

app.use(errorHandler);

app.get('/hello', function (req, res) {

    db.collection('test')
        .findOne({}, function (err, doc) {

            if (err) throw err;

            res.render('hello', doc);
        });

});

app.get('/:name', function (req, res, next) {
    var name = req.params.name;
    var var1 = req.query.req1;
    var var2 = req.query.req2;
    res.render('get_example', {
        name: name,
        var1: var1,
        var2: var2
    });
});

router.route('/favourite_fruit')
    .get(function (req, res) {
        res.render('favourite_fruit', { fruits: ['apple', 'banana', 'kiwi', 'pear'] });
    });

router.route('/favourite_fruit')
    .post(function (req, res) {
        var favourite = req.body.fruit;

        if (favourite === undefined) {
            res.render('favourite_fruit', {
                message: 'Please select a fruit!',
                fruits: ['apple', 'banana', 'kiwi', 'pear']
            });
        } else {
            res.send('Your favourite fruit is ' + favourite);
        }
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

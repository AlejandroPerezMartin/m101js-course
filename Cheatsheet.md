# Manage database and collections

```javascript
db;
use "dbname";
show collections;
db.createCollection(name);
db.collection.drop(); // delete collection
db.collection.remove({}); // delete collection
```

# Finding

```javascript
db.collection.find(); // retrieve all documents of collection
db.collection.find({ key : value }); // also works with arrays

// Element operators
db.collection.find({ key : { $in : ['prop1', 'prop2'] } }); // selects the documents where the value of a field equals any value in the specified array
db.collection.find({ key : { $nin : ['prop1', 'prop2'] } }); // opposite to $inserted
db.collection.find({ key : { $all : ['prop1', 'prop2'] } }); // array contains all the specified elements
db.collection.find({ key : value }, { key : true });
db.collection.find({ key : value }).pretty(); // better readability results
db.collection.find({ key : { value : { $gt : 2 } });
db.collection.find({ key : { value : { $lt : "C" } });
db.collection.find({ key : { value : { $gte : 5, $lt : 8 } }); // $gte $gt $lte $lt
db.collection.find({ key : { $exists : true/false } });

// Regex operators
db.collection.find({ key : { $regex : "^pattern" } });
db.collection.find({ 'details.email' : 'a@a.com'});

// Logical operators
db.collection.find({ $or : [ { key1 : { $regex : "pattern$" } }, { key2 : { $exists : true } } ] });
db.collection.find({ $and : [ { key1 : { $regex : "pattern$" } }, { key2 : { $exists : true } } ] });
db.collection.find({ key : { $type : 2 } }); // All $type codes: http://docs.mongodb.org/manual/reference/bson-types/

// Array operators
db.collection.find({ key : { $all : ["a", "b"] } }); // matches arrays that contains all elements of the query
db.collection.find({ key : { $size : 6 } });
db.collection.find({ key : { $elemMatch : { prop1: "criteria", prop2: { $gt: 2 }  } } }); // selects documents if element in the array field matches all the $elemMatch conditions

db.collection.findOne(); // get random document from collection
db.collection.findOne({ key : value });
db.collection.findOne({ key : value }, { _id : false }); // do not show _id field
db.collection.findOne({ key : value }, { _id : false, key : value ... }); // only show key field
db.collection.findOne().pretty();

db.collection.find().count(); // count number of results after searching
db.collection.count( { key : 'value' } ); // count number of results after query execution
```

# Inserting

```javascript
db.collection.insertOne({ name: 'Name', details: { email: 'a@a.com', phone: 1234 } });
db.collection.insert({ name: 'Name', details: { email: 'a@a.com', phone: 1234 } });
```

# Update

```javascript
db.collection.save({ object }); // update existing or insert if not exists
db.collection.update( { query }, { key : 'New value' } ); // update field value and remove rest of fields except 'key'
db.collection.update( { query }, { $set : { key : value } } ); // update field of document, and keep others fields (not as previous update)
db.collection.update( { query }, { $set : { key : value } }, { upsert : true } ); // update field of document, if query doesn't match any document, it's created
db.collection.update( { query }, { $set : { key : value } }, { multi : true } ); // update fields (one or more) matched after query execution
db.collection.update( { query }, { $unset : { key : 1 } } ); // remove field 'key' from document
db.collection.update( { key: { $lt : 10 } }, { $inc : { key : 5 }   }, { multi : true } ); // $inc: increments field's key value by the specified number (accepts negative numbers)
db.collection.updateMany( { query }, { $unset : { key: "" } } );
```

# Cursors

```javascript
cursors = db.collection.find(); null;
cursors.hasNext(); // > true/false
cursors.next();
cursors.limit(5);
cursors.sort( { name: -1 } ); // 1: ascending, -1: descending
```

# Array field manipulation

```javascript
db.arrays.insert( { _id : 0, a : [ 1, 2, 3, 4 ] } );
db.arrays.updateOne( { _id : 0 }, { $set : { 'a.2' : 5 } } ); // > [1, 2, 5, 4]
db.arrays.update( { _id : 0 }, { $set : { 'a.2' : 5 } } ); // > [1, 2, 5, 4]
db.arrays.update( { _id : 0 }, { $push : { a : 6 } } ); // adds element to 'a' array
db.arrays.update( { _id : 0 }, { $pushAll : { a : [ 6, 7, 8 ] } } ); // adds all elements of the array to 'a' array
db.arrays.update( { _id : 0 }, { $pop : { a : 1/-1 } } ); // remove first (1) or last (-1) element of 'a' array
db.arrays.update( { _id : 0 }, { $pull : { a : 5 } } ); // remove value from 'a' array
db.arrays.update( { _id : 0 }, { $pullAll : { a : [ 2, 5 ] } } ); // remove all array elements from 'a' array
db.arrays.update( { _id : 0 }, { $addToSet : { a : 5 } } ); // adds value to array only if not exists, if exists is not inserted
```

# Indexes

```javascript
db.collection.createIndex( { key : 1 } ); // use key as index and order (1: ascending, -1: descending)
db.collection.createIndex( { key : 1, key2: -1 } ); // use key as index and order (1: ascending, -1: descending)
db.collection.createIndex( {key: 1 }, { unique: true } ); // create unique index
db.collection.getIndexes();
db.collection.dropIndex( { key : 1 } ); // provide same as created index

// Create indexes on arrays
db.collection.createIndex( { key.subkey : 1 } );

// Partial indexes (create indexes conditionally).
// > Find expression should filter by the key specified as condition in order to make an idexed search
db.collection.createIndex( { 'key.subkey' : 1 },
                           {partialFilterExpression: { 'key' : { $exists: true }¡ } }
);

```

# Aggregation

```javascript
// Simple Aggregation
// group results by $key, create a field "result_field" on each resulting group and does the specified operation
db.collection.aggregate([
    {
        $group: {
            _id: "$key",
            result_field: { $sum: "$key" } // $sum, $avg, $addToSet, $push, $max, $min, $first, $last
        }
]);

// Double Aggregation
db.collection.aggregate([
    {
        $group : {
            _id : "$key",
            result_field : { $sum: "$key" }
        }
    },
    {
        $group: {
            _id : "$key._id",
            another_field : { $max: "$key" }
        }
    }
]);

// $project
db.zips.aggregate([
    {
        $project : {
            _id : 0, // 0, do not show _id
            result_field : { $toLower : "$key" }, // transform key $toLower, $toUpper, etc
            another_field : 1, // 1, show key
            _id : "$key", // reshape _id
        }
    }
]);

// $match and $sort
db.zips.aggregate([
    {
        $match : {
            key : "match"
        }
    },
    {
        $group : {
            ...
        }
    },
    {
        $sort : {
            "key" : 1,      // 1 ascending, -1 descending
            "key2" : -1
        }
    }
]);

```

# Other

```javascript
db.collection.remove( { key : value } ); // delete all the matched documents
db.runCommand( { getLastError : 1 } ); // show last error
db.collection.explain(true]).[find|update|...]({}); // provides info about the query plan
```

# Replication
```javascript
mongo localhost:30001 // connect to mongo replica set (not only for replicas), also 'mongo --port 30001'
rs.initiate(); // start replica set
rs.slaveOk(true); // allows the current connection to allow read operations to run on secondary members

// Check oplog (https://docs.mongodb.org/manual/core/replica-set-oplog/)
use local;
db.oplog.rs.find();
```


Sharding
```javascript
sh.status();
```

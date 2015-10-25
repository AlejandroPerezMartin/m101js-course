# Manage database and collections

```javascript
db;
use "dbname";
show collections;
db.name.drop(); // delete collection
db.name.remove({}); // delete collection
````

# Finding

```javascript
db.name.find(); // retrieve all documents of collection
db.name.find({ key : value }); // also works with arrays
db.name.find({ key : { $in : ['prop1', 'prop2'] } }); // selects the documents where the value of a field equals any value in the specified array
db.name.find({ key : { $nin : ['prop1', 'prop2'] } }); // opposite to $inserted
db.name.find({ key : { $all : ['prop1', 'prop2'] } }); // array contains all the specified elements
db.name.find({ key : value }, { key : true });
db.name.find({ key : value }).pretty(); // better readability results
db.name.find({ key : { value : { $gt : 2 } });
db.name.find({ key : { value : { $lt : "C" } });
db.name.find({ key : { value : { $gte : 5, $lt : 8 } }); // $gte $gt $lte $lt
db.name.find({ key : { $exists : true/false } });
db.name.find({ key : { $regex : "^pattern" } });
db.name.find({ 'details.email' : 'a@a.com'});
db.name.find({ $or : [ { key1 : { $regex : "pattern$" } }, { key2 : { $exists : true } } ] });
db.name.find({ $and : [ { key1 : { $regex : "pattern$" } }, { key2 : { $exists : true } } ] });
db.name.find({ key : { $type : 2 } }); // All $type codes: http://docs.mongodb.org/manual/reference/bson-types/

db.name.findOne(); // get random document from collection
db.name.findOne({ key : value });
db.name.findOne({ key : value }, { _id : false }); // do not show _id field
db.name.findOne({ key : value }, { _id : false, key : value ... }); // only show key field
db.name.findOne().pretty();

db.name.find().count(); // count number of results after searching
db.name.count( { key : 'value' } ); // count number of results after query execution
```

# Inserting

```javascript
db.name.insert({ name: 'Name', details: { email: 'a@a.com', phone: 1234 } });
```

# Update

```javascript
db.name.save({ object }); // update existing or insert if not exists
db.name.update( { query }, { key : 'New value' } ); // update field value and remove rest of fields except 'key'
db.name.update( { query }, { $set : { key : value } } ); // update field of document, and keep others fields (not as previous update)
db.name.update( { query }, { $set : { key : value } }, { upsert : true } ); // update field of document, if query doesn't match any document, it's created
db.name.update( { query }, { $set : { key : value } }, { multi : true } ); // update fields (one or more) matched after query execution
db.name.update( { query }, { $unset : { key : 1 } } ); // remove field 'key' from document
db.name.update( { key: { $lt : 10 } }, { $inc : { key : 5 }   }, { multi : true } ); // $inc: increments field's key value by the specified number (accepts negative numbers)
````

# Cursors

```javascript
cursors = db.name.find(); null;
cursors.hasNext(); # > true/false
cursors.next();
cursors.limit(5);
cursors.sort( { name: -1 } );
````

# Array field manipulation

```javascript
db.arrays.insert( { _id : 0, a : [ 1, 2, 3, 4 ] } );
db.arrays.update( { _id : 0 }, { $set : { 'a.2' : 5 } } ); # > [1, 2, 5, 4]
db.arrays.update( { _id : 0 }, { $push : { a : 6 } } ); # adds element to 'a' array
db.arrays.update( { _id : 0 }, { $pushAll : { a : [ 6, 7, 8 ] } } ); # adds all elements of the array to 'a' array
db.arrays.update( { _id : 0 }, { $pop : { a : 1/-1 } } ); # remove first (1) or last (-1) element of 'a' array
db.arrays.update( { _id : 0 }, { $pull : { a : 5 } } ); # remove value from 'a' array
db.arrays.update( { _id : 0 }, { $pullAll : { a : [ 2, 5 ] } } ); # remove all array elements from 'a' array
db.arrays.update( { _id : 0 }, { $addToSet : { a : 5 } } ); # adds value to array only if not exists, if exists is not inserted
````

# Other

```javascript
db.name.remove( { key : value } ); // delete all the matched documents
db.runCommand( { getLastError : 1 } ); // show last error
````

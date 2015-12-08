// Final exam Question 1
// Answer is: 3

mongorestore -d enron -c messages messages.bson

use enron;
db.messages.count({"headers.From": "andrew.fastow@enron.com", "headers.To": "jeff.skilling@enron.com"});

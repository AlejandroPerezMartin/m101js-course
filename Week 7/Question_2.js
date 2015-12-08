// Final exam Question 2
// Answer is: susan.mara@enron.com to jeff.dasovich@enron.com (750 messages)

use enron;
db.messages.aggregate([

    {
        $match: {
           "headers.From": {
                $in: [
                    "susan.mara@enron.com",
                    "soblander@carrfut.com",
                    "evelyn.metoyer@enron.com"
                ]
            }
        }
    },
    {
        $unwind: "$headers.To"
    },
    {
        $group: {
            _id: {
                "id": "$_id",
                "to": "$headers.To",
                "from": "$headers.From"
            }
        }
    },
    {
        $group: {
            _id: {
                from: "$_id.from",
                to: "$_id.to"
            },
            "count": {
                $sum: 1
            }
        }
    },
    {
        $sort: {
            "count": -1
        }
    }
]);

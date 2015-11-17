
db.zips.aggregate([
    {
        $group: {
            _id : { state: "$state", city: "$city"},
            population: { $sum: "$pop"}
        }
    },
    {
        $match: {
            "_id.state": { $in : ["CA", "NY"]},
            "population" : { $gt : 25000}
        }
    },
    {
        $group: {
            _id: "$_id.state",
            population: { $avg: "$population"}
        }
    }
]);

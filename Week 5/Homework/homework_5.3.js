use test;
db.grades.aggregate([
    {
        $unwind : "$scores"
    },
    {
        $match : {
            "scores.type": { $in : ["homework","exam"] }
        }
    },
    {
        $group : {
            _id : { "class" : "$class_id", "student" : "$student_id"},
            student_avg : { $avg : "$scores.score" }
        }
    },
    {
        $group : {
            _id : "$_id.class",
            class_avg : { $avg : "$student_avg" }
        }
    },
    {
        $sort : {
            class_avg : -1
        }
    },
    {
        $project : {
            _id : 0,
            solution : "$_id"
        }
    },
    {
        $limit : 1
    }
]);

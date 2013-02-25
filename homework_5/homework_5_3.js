use 10gen
db.grades.aggregate([
  {
    $unwind: "$scores"
  },
  {
    $match: {"scores.type": {$in: ["exam", "homework"]}}
  },
  {
    $group: {
      _id: {student_id: "$student_id", class_id: "$class_id"},
      avg: {$avg: "$scores.score"}
    }
  },
  {
    $group: {
      _id: "$_id.class_id",
      avg: {$avg: "$avg"}
    }
  },
  {
    $sort: {avg: 1}
  }
])

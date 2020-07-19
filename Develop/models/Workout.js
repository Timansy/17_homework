const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const WorkoutSchema = new Schema(
  {
    // _id: String,
    day: Date,
    exercises: [
      {
        type: String,
        name: String,
        duration: Number,
        weight: Number,
        reps: Number,
        sets: Number,
        distance: Number,
      },
    ],
  },
  { typeKey: "$type" }
);

const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;

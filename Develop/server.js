const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

mongoose.set("useFindAndModify", false);

const PORT = process.env.PORT || 3000;

const db = require("./models");
const { Exercise } = require("./models");

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", {
  useNewUrlParser: true,
});

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});

app.get("/api/workouts", (req, res) => {
  db.Workout.find({})
    .sort({ date: -1 })
    .then((dbWorkout) => {
      res.json(dbWorkout);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

app.get("/exercise", (req, res) => {
  //console.log(req.param("id"));
  // res.redirect("/exercise.html");
  res.redirect("/exercise.html" + "?id=" + req.param("id"));
});

app.put("/api/workouts/:id", (req, res) => {
  if (mongoose.Types.ObjectId.isValid(req.params.id)) {
    let tj = req.body;

    db.Workout.findOneAndUpdate(
      // { _id: mongoose.Types.ObjectId(req.params.id) },
      { _id: req.params.id },
      { $push: { exercises: tj } }
    )
      .then((dbUser) => {
        console.log(dbUser);
      })
      .catch(({ message }) => {
        console.log(message);
      });
  }
});

app.put("/api/workouts/undefined", (req, res) => {
  db.Workout.create({})
    .then((dbWorkout) => {
      res.json(dbWorkout);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});
// db.User.create({ name: "Ernest Hemingway" })
//   .then(dbUser => {
//     console.log(dbUser);
//   })
//   .catch(({ message }) => {
//     console.log(message);
//   });

// app.get("/notes", (req, res) => {
//   db.Note.find({})
//     .then(dbNote => {
//       res.json(dbNote);
//     })
//     .catch(err => {
//       res.json(err);
//     });
// });

// app.get("/user", (req, res) => {
//   db.User.find({})
//     .then(dbUser => {
//       res.json(dbUser);
//     })
//     .catch(err => {
//       res.json(err);
//     });
// });

// app.post("/submit", ({ body }, res) => {
//   db.Note.create(body)
//     .then(({ _id }) => db.User.findOneAndUpdate({}, { $push: { notes: _id } }, { new: true }))
//     .then(dbUser => {
//       res.json(dbUser);
//     })
//     .catch(err => {
//       res.json(err);
//     });
// });

// app.get("/populateduser", (req, res) => {
//   db.User.find({})
//     .populate("notes")
//     .then(dbUser => {
//       res.json(dbUser);
//     })
//     .catch(err => {
//       res.json(err);
//     });
// });

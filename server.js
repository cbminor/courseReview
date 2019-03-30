const express = require('express');
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(express.static('public'));

const mongoose = require('mongoose');

// connect to the database
mongoose.connect('mongodb://localhost:27017/coursereview1', {
  useNewUrlParser: true
});

const courseSchema = new mongoose.Schema({
  title: String,
  courseID: String,
  professors: [String],
  description: String,
  department: String,
  whenOffered: [String],
  prereqs: [String],
  credits: Number,
  reviews: [],
  averageEnjoyability: Number,
  averageInterest: Number,
  averageDifficulty: Number,
  averageTime: Number,
});

const reviewSchema = new mongoose.Schema({
  enjoyability: Number,
  difficulty: Number,
  interest: Number,
  time: Number,
  professor: String,
  review: String,
  date: String,
})

const Course = mongoose.model('Course', courseSchema);
const Review = mongoose.model('Review', reviewSchema);

app.post('/api/courses', async (req, res) => {
  const course = new Course({
    title: req.body.title,
    courseID: req.body.courseID,
    professors: req.body.professors,
    description: req.body.description,
    department: req.body.department,
    whenOffered: req.body.whenOffered,
    prereqs: req.body.prereqs,
    credits: req.body.credits,
    reviews: [],
    averageEnjoyability: 0,
    averageInterest: 0,
    averageDifficulty: 0,
    averageTime: 0,
  })
  try {
    await course.save();
    res.send(course);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.get('/api/courses', async (req, res) => {
  try {
    let courses = await Course.find();
    res.send(courses);
  } catch (error) {
    console.log(error);
    sendStatus(500);
  }
});

// app.put('/api/courses/:id', async (req, res) => {
//   try {
//     let course = await Course.findOne({
//       _id: req.params.id
//     });
//     course.reviews.push(req.body.review);
//     course.save();
//   } catch (error) {
//     console.log(error);
//   }
// });

app.put('/api/courses/:id', async (req, res) => {
  try {
    let course = await Course.findOne({
      _id: req.params.id
    });
    course.title = req.body.title;
    course.courseID = req.body.courseID;
    course.professors = req.body.professors;
    course.description = req.body.description;
    course.department = req.body.department;
    course.whenOffered = req.body.whenOffered;
    course.prereqs = req.body.prereqs;
    course.credits = req.body.credits;
    course.reviews = req.body.reviews;
    course.averageEnjoyability = req.body.averageEnjoyability;
    course.averageInterest = req.body.averageInterest;
    course.averageDifficulty = req.body.averageDifficulty;
    course.averageTime = req.body.averageTime;
    course.save();
  } catch (error) {
    console.log(error);
  }
});

app.delete('/api/courses/:id', async (req, res) => {
  try {
    await Course.deleteOne({
      _id: req.params.id
    });
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
})


app.listen(3000, () => console.log('Server listening on port 3000!'));
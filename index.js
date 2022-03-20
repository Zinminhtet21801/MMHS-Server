require("dotenv").config();
const express = require("express");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const cors = require("cors");
const moongoose = require("mongoose");
const { verifyStudentData } = require("./verifyData");
const {
  adminsModel,
  studentsModel,
  classesModel,
} = require("./database/Models");
const cloudinary = require("cloudinary").v2;
const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.json({ limit: "10mb", extended: true }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
passport.use(
  new LocalStrategy(function (email, password, done) {
    adminsModel.findOne({ email: email }, function (err, user) {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false);
      }
      if (!user.verifyPassword(password)) {
        return done(null, false);
      }
      return done(null, user);
    });
  })
);
app.use("/", require("./routes/register"));
app.use("/", require("./routes/courses"));
app.use("/apply", require("./routes/applyStudent"));
app.use("/", require("./routes/getCourses"));
app.use("/", require("./routes/getStudentCount"));
app.use("/login", require("./routes/login"));

moongoose.connect(process.env.DB_CONNECT_URL);

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/apply", async (req, res) => {
  const {
    name,
    phoneNumber,
    occupancy,
    gender,
    age,
    email,
    company,
    desiredCourse,
  } = req.body;
  const validStudent = verifyStudentData(
    name,
    age,
    gender,
    email,
    phoneNumber,
    company,
    desiredCourse
  );
  console.log(validStudent);
  if (!validStudent) return res.status(400).send("BOO do some shit");

  console.log("SHIT12");

  try {
    const student = new studentsModel({
      name,
      phone: phoneNumber,
      occupancy,
      gender,
      age,
      email,
      company,
      desiredCourse,
    });
    // const a = await student.save();
  } catch (e) {
    console.log(e);
  }
});

app.listen(PORT, () => {
  console.log("SHIT");
});

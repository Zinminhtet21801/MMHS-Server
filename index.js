require("dotenv").config();
const express = require("express");
const cors = require("cors");
const moongoose = require("mongoose");
const { verifyStudentData } = require("./verifyData");
const { adminsModel, studentsModel } = require("./database/Models");
const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

moongoose.connect(process.env.DB_CONNECT_URL);

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

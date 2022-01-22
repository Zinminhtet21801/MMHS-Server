const mongoose = require("mongoose");

const adminsSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: Number },
  role: String,
});

// const booksSchema = new mongoose.Schema({
//     book_name : {type:String, required:true},
//     author : {type:String, required:true},
//     author_pic : String,
//     category : {type:String, required:true},
//     details : String,
//     publisher : String,
//     publish_date : Date
// })

// const classesSchema = new mongoose.Schema({
//     class_name : {type:String, required:true},
//     teacher_name : {type:String, required:true},
//     starting_date : {type:Date, required:true},
//     ending_date : {type:Date, required:true},
//     details : String
// })

// const eventsSchema = new mongoose.Schema({
//     event_name : {type:String, required:true},
//     event_place : {type:String, required:true},
//     event_date : {type:Date, required:true},
//     organizer : {type:String, required:true},
//     details : String
// })

const studentsSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  gender: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: Number, required: true },
  occupation: { type: String },
  company: {
    type: String,
    required: true,
  },
  desiredCourse: {
    type: String,
    required: true,
  },
});
// class_id: { type: String, required: true },

const adminsModel = new mongoose.model("admin", adminsSchema);

// const booksModel = new mongoose.Model("book", booksSchema)
// const classesModel = new mongoose.Model("class", classesSchema)
// const eventsModel = new mongoose.Model("event", eventsSchema)
const studentsModel = new mongoose.model("student", studentsSchema);
module.exports = { adminsModel, studentsModel };

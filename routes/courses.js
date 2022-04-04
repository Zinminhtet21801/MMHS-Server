const router = require("express").Router();
const { verifyClassData } = require("../verifyData");
const { classesModel } = require("../database/Models");
const cloudinary = require("cloudinary").v2;
const { ObjectID, ObjectId } = require("mongodb");

async function uploadToCloudinary(courseImageUpload) {
  const imagesToBeUploaded = courseImageUpload?.fileList?.filter(
    (image) => image?.name
  );
  let imagesToNotBeUploaded = [];
  for (i = 0; i < courseImageUpload?.fileList?.length; i++) {
    if (courseImageUpload?.fileList[i]?.url) {
      imagesToNotBeUploaded.push(courseImageUpload?.fileList[i]?.url);
    }
  }

  let images = [];
  for (let i = 0; i < imagesToBeUploaded.length; i++) {
    const img = await cloudinary.uploader
      .upload(
        imagesToBeUploaded[i].thumbUrl,
        (error, result) => result.secure_url
      )
      .then((value) => images.push(value.secure_url));
  }
  return [...images, ...imagesToNotBeUploaded];
}

router.post("/addCourse", async (req, res) => {
  const {
    courseImageUpload,
    courseName,
    details,
    endingDate,
    fee,
    startingDate,
    studentLimit,
    teacher,
  } = req.body;
  const classData = await verifyClassData(
    courseName,
    details,
    endingDate,
    fee,
    startingDate,
    studentLimit,
    teacher
  ).then((value) => value);
  if (!classData) {
    return res.status(400).json({ message: "Error:Wrong type of Data!" });
  }
  try {
    const courseCheck = await classesModel
      .findOne({ courseName: courseName })
      .exec();
    if (!courseCheck) {
      let image = [];
      image = await uploadToCloudinary(courseImageUpload);

      const classes = new classesModel({
        courseImageUpload: image,
        courseName: courseName,
        details: details,
        endingDate: endingDate,
        fee: fee,
        startingDate: startingDate,
        studentLimit: studentLimit,
        teacher: teacher,
      });
      console.log("haha");
      await classes.save();
      return res.json({ message: "Success:Course created successfully!" });
    }
    return res.json({ message: "Error:Course already exists!" });
  } catch (e) {
    console.log(e);
  }
});

router.put("/editCourse/:id", async (req, res) => {
  console.log(req.params.id);
  const { id } = req.params;
  const {
    courseImageUpload,
    courseName,
    teacher,
    studentLimit,
    fee,
    startingDate,
    endingDate,
    details,
  } = req.body;
  const classData = await verifyClassData(
    courseName,
    details,
    endingDate,
    fee,
    startingDate,
    studentLimit,
    teacher
  ).then((value) => value);
  if (!classData) {
    return res.status(400).json({ message: "Error:Wrong type of Data!" });
  }
  try {
    const courseCheck = await classesModel
      .findOne({ courseName: courseName })
      .exec();
    if (courseCheck) {
      let image;
      image = await uploadToCloudinary(courseImageUpload);
      const classes = await classesModel.updateOne(
        { _id: ObjectId(id) },
        {
          courseImageUpload: image,
          courseName: courseName,
          details: details,
          endingDate: endingDate,
          fee: fee,
          startingDate: startingDate,
          studentLimit: studentLimit,
          teacher: teacher,
        }
      );
      console.log(image);
      return res
        .status(200)
        .json({ message: "Success:Course updated successfully!" });
    }
    return res.json({ message: "Error:Course already exists!" });
  } catch (e) {
    console.log(e);
  }
});

router.delete("/deleteCourse/:id", async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    const classes = await classesModel.deleteOne({ _id: ObjectId(id) });
    return res.json({ message: "Success:Course deleted successfully!" });
  } catch (e) {
    console.log(e);
  }
});
module.exports = router;

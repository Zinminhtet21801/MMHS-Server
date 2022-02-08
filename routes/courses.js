const router = require("express").Router();
const { verifyClassData } = require("../verifyData");
const { classesModel } = require("../database/Models");
const cloudinary = require("cloudinary").v2;
router.post("/modifyCourse", async (req, res) => {
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
    return res.json({ message: "Error:Wrong type of Data!" });
  }
  try {
    const courseCheck = await classesModel
      .find({ courseName: courseName })
      .exec();
    if (courseCheck.length == 0) {
      let image = [];
      for (let i = 0; i < courseImageUpload.fileList.length; i++) {
        const img = await cloudinary.uploader.upload(
          courseImageUpload.fileList[i].thumbUrl,
          (error, result) => result.secure_url
        ).then((value) => image.push(value.secure_url));
      }

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
      await classes.save()
      return res.json({ message: "Success:Course created successfully!" });
    }
    return res.json({ message: "Error:Course already exists!" });
  } catch (e) {
    console.log(e);
  }
});
module.exports = router;
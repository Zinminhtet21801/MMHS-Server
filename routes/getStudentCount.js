const { studentsModel } = require("../database/Models");
const router = require("express").Router();

router.get("/getStudentCount/:courseID", async (req, res) => {
  try {
    const { courseID } = req.params;
    console.log(courseID);
    const studentCount = await studentsModel.countDocuments({
      desiredCourse: courseID,
    });
    console.log(studentCount);
    res.json({ studentCount });
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;

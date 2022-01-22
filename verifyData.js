const Joi = require("joi");

const studentSchema = Joi.object({
  name: Joi.string().min(5).max(30).required(),
  age: Joi.number().min(1).max(80).required(),
  gender: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().min(11).max(11).required(),
  company: Joi.string().required(),
  desiredCourse: Joi.string().required(),
});

const verifyStudentData = async (
  name,
  age,
  gender,
  email,
  phone,
  company,
  desiredCourse
) => {
  try {
    const { error } = await studentSchema.validateAsync({
      name,
      age,
      gender,
      email,
      phone,
      company,
      desiredCourse,
    });

    if (typeof error === "undefined") {
      return true;
    } else {
      return false;
    }
  } catch (e) {
    console.log(e.details[0].message);
  }
};

module.exports = { verifyStudentData };

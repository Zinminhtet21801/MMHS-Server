const router = require("express").Router();
const passport = require("passport");
const LocalStrategy = require("passport-local");
const { adminsModel } = require("../database/Models");
router.post(
  "/",
  passport.authenticate("local", { failureRedirect: "/login" }),
  async (req, res) => {
    console.log(req.body);
    res.status(200).json({
      message: "Successfully logged in",
    });

    // const { email, password } = req.body;
    // try {
    //   const admin = await adminModel.findOne({ email: email }).exec();
    //   if (admin) {
    //     if (admin.password == password) {
    //       res.json({ admin });
    //     } else {
    //       res.json({ message: "Error:Wrong password!" });
    //     }
    //   } else {
    //     res.json({ message: "Error:No such admin!" });
    //   }
    // } catch (e) {
    //   console.log(e);
    // }
  }
);

module.exports = router;

const router = require("express").Router();
const { adminModel } = require("../database/Models");
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const admin = await adminModel.findOne({ email: email }).exec();
    if (admin) {
      if (admin.password == password) {
        res.json({ admin });
      } else {
        res.json({ message: "Error:Wrong password!" });
      }
    } else {
      res.json({ message: "Error:No such admin!" });
    }
  } catch (e) {
    console.log(e);
  }
});

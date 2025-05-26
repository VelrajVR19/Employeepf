const express = require("express");
const router = express.Router();
const { sendEmail } = require("../controller/emailController");

router.post("/send", sendEmail);
router.get("/",(req,res)=>{
 return res.sendFile(path.join(__dirname, "../public/index.html"));
})

module.exports = router;

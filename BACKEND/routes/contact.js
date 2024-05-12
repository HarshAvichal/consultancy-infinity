const express = require("express");
const router = express.Router();

const {userDetails} = require("../controller/userDetails");

router.post('/contact',userDetails);


module.exports = router;
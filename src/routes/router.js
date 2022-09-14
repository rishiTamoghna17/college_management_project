const express = require('express');
const route = express.Router();
const collegeController= require("../controllers/collegeController")


route.post("/functionup/colleges",collegeController.createCollege)











module.exports = route;
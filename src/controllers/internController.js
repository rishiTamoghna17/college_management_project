const { default: mongoose } = require("mongoose")
const collegeModel = require("../models/collegeModel")
const internModel = require("../models/internModel")

//create internship
const isValid = function (value) {
    if (typeof value === "undefined" || value === null) return false;
    if (typeof value === "string" && value.trim().length === 0) return false;
    return true;
  };
const createIntern = async function (req, res) {
    try {
        let data = req.body
        console.log(data)
        let { name, email, mobile, collegeName } = data
        if (Object.keys(data).length === 0){
         return res.status(400).send({ status: false, message: "pls enter the data in body" })
        }
        //name validation
        if (!isValid(name)) {
        return res.status(400).send({ status: false, message: "name is mendatory" })
        }
        let regEx = /^[a-zA-Z ]*$/;
        if (!regEx.test(name)) {
            return res.status(400).send({ status: false, message: "Name in alphabitical order" });
        }


        //email validation
        if (!isValid(email)) {
        return res.status(400).send({ status: false, message: "email is mendatory" })
        }
        if (!(/[a-z0-9]+@[a-z]+\.[a-z]{2,3}/).test(email)) {
            return res.status(400).send({ status: false, message: "Please provide a valid email"});
        }
        const findemail = await internModel.findOne({ email: email })
        if (findemail){
         return res.status(400).send({ status: false, message: "email should be unique" });
        }

        //mobile number validation
        if (!isValid(mobile)) {
            return res.status(400).send({ status: false, message: "mobileno is mendatory" })
        }
        const findmobile = await internModel.findOne({ mobile: mobile })
        if (findmobile){
        return res.status(400).send({ status: false, message: "mobile no should be unique" });
        }
        if (!(/^[6-9]\d{9}$/).test(mobile)) {
            return res.status(400).send({ status: false, message: "mobileno should be in 0-9" });
        }
        findCollege = await collegeModel.findOne({ name: collegeName, isDeleted: false })
        if (!findCollege) return res.status(404).send({ status: false, message: "Entered college is Not present in DB" })
        data.collegeId = (findCollege._id).toString()

        let savedata = await internModel.create(data)
        console.log(savedata)
        return res.status(201).send({ status: true, data:savedata })
    }

    catch (err) {
        res.status(500).send({ msg: err.message })
    }
}
module.exports.createIntern = createIntern
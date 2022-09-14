const { default: mongoose } = require("mongoose")
const collegeModel = require("../models/collegeModel")
const internModel = require("../models/internModel")
const createIntern = async function (req, res) {
    try {
        let data = req.body
        let { name, email, mobile, isDeleted, collegeId } = data
        if (!Object.keys(data).length) return res.status(400).send({ status: false, message: "pls enter the data in body" })
        //name validation
        if (!name) return res.status(400).send({ status: false, message: "name is mendatory" })
        let regEx = /^[a-zA-Z]+ [a-zA-Z]/;
        if (!regEx.test(name)) {
            return res.status(400).send({ status: false, message: "Name in alphabitical order" });
        }
        //email validation
        if (!email) return res.status(400).send({ status: false, message: "email is mendatory" })
        if (!(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/).test(email)) {
            return res.status(400).send({ status: false, message: "email in alphanumric order" });
        }
        //mobile number validation
        if (!mobile) return res.status(400).send({ status: false, message: "mobileno is mendatory" })
        if (!(/^\+?[0-9-]/).test(mobile)) {
            return res.status(400).send({ status: false, message: "mobileno should be in 0-9" });
        }
        //check if isDeleted is TRUE/FALSE ?
        if (isDeleted && (isDeleted === "" || (!(typeof isDeleted == "boolean")))) {
            return res.status(400).send({ status: false, message: "isDeleted Must be TRUE OR FALSE" });
        }
        if (isDeleted)
            return res.status(400).send({ status: false, message: "you can not set isdeleted True" });
        let findCollege = await collegeModel.findOne({ _id: data.collegeId }).populate('collegeId')
        console.log(findCollege)
        if (!findCollege) return res.status(400).send({ satus: false, msg: "college id is not present" })
        if(!mongoose.isValidObjectId(collegeId)){
            return res.status(400).send({status:false,message:"Invalid collegeId"})
        }
        let savedata = await internModel.create(data)
        res.status(201).send({ status: true, data: savedata, findCollege })
    }

    catch (err) {
        res.status(500).send({ msg: err.messege })
    }
}
module.exports.createIntern = createIntern
const { default: mongoose } = require("mongoose")
const collegeModel = require("../models/collegeModel")
const internModel = require("../models/internModel")

//create internship
const createIntern = async function (req, res) {
    try {
        let data = req.body
        let { name, email, mobile, collegeId } = data
        if (!Object.keys(data).length) return res.status(400).send({ status: false, message: "pls enter the data in body" })
        //name validation
        if (!name) return res.status(400).send({ status: false, message: "name is mendatory" })
        let regEx = /^[a-zA-Z]+ [a-zA-Z]/;
        if (!regEx.test(name)) {
            return res.status(400).send({ status: false, message: "Name in alphabitical order" });
        }


        //email validation

        if (!email) return res.status(400).send({ status: false, message: "email is mendatory" })
        if (!(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*/).test(email)) {
            return res.status(400).send({ status: false, message: "email in alphanumric order" });
        }
        const findemail = await internModel.findOne({ email: email })
        if (findemail) return res.status(400).send({ status: false, message: "email should be unique" });

        //mobile number validation
        if (!mobile) return res.status(400).send({ status: false, message: "mobileno is mendatory" })
        if ((!(/^[789]\d{9}$/)).test(mobile)) {
            return res.status(400).send({ status: false, message: "mobileno should be in 0-9" });
        }
        const findmobile = await internModel.findOne({ mobile: mobile })
        if (findmobile) return res.status(400).send({ status: false, message: "mobile no should be unique" });

        if (!mongoose.isValidObjectId(collegeId)) {
            return res.status(400).send({ status: false, message: "Invalid collegeId" })
        }
        let getCollege = await collegeModel.findById(collegeId)
        if (!getCollege) {
            return res.status(404).send({ status: false, message: "college is not registered" })
        }



        let savedata = await internModel.create(data)
        return res.status(201).send({ status: true, data: savedata })
    }

    catch (err) {
        res.status(500).send({ msg: err.messege })
    }
}
module.exports.createIntern = createIntern
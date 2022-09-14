
const collegeModel= require("../models/collegeModel")
const internModel= require("../models/internModel")
const mongoose=require('mongoose')

const createCollege = async function (req, res) { 
    
        try {
            const data = req.body; 

            // destructure college data
            let { name, fullName, logoLink, isDeleted, ...rest } = data
            console.log(data)
            if (!Object.keys(data).length) return res.status(400).send({ status: false, message: "pls enter the data in body" })

            //do not accept undefiend attributes
            if (Object.keys(rest).length > 0)
                  return res.status(400).send({ status: false, message: "pls enter only name, fullname,logoLink" });

            //validate the college name
            if (!name) return res.status(400).send({ status: false, message: "Name is Missing" })
             //Check if college full name present or not?
             if (!fullName) return res.status(400).send({ status: false, message: "Fullname is Missing" })

            //Check if Name Is Vilid or Not?
            var regEx = /[a-z]+/;
            if (!regEx.test(name)) {
                  return res.status(400).send({ status: false, message: "Name is invalid" });
            }

            //Check if fullName Is Vilid or Not?
            var regEex = /[a-z]+/;
            if (!regEex.test(fullName)) {
                  return res.status(400).send({ status: false, message: "fullName is invalid" });
            }

            //Check if college logoLink present or not?
            if (!logoLink) return res.status(400).send({ status: false, message: "LogoLink is Missing" })

            // Check the LogoLink Is Valid or Not?
            if (!(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%.\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%\+.~#?&//=]*)/.test(data.logoLink))) {
                  return res.status(400).send({ status: false, msg: 'Not a valid logoLink' })
            }

            //check if isDeleted is TRUE/FALSE ?
            if (isDeleted && (isDeleted === "" || (!(typeof isDeleted == "boolean")))) {
                  return res.status(400).send({ status: false, message: "isDeleted Must be TRUE OR FALSE" });
            }
            if (isDeleted)
            return res.status(400).send({ status: false, message: "you can not set isdeleted True" });

            //if college name is already present In DB or Not!
          const findName = await collegeModel.findOne({ name: name })
            if (findName) return res.status(400).send({ status: false, message: "Name Is Already Present In DB" });

            //create Data In DB
            let collegeData = await collegeModel.create(data)
            return res.status(201).send({ status: true, data: collegeData });
      }
       catch (err) {
             return res.status(500).send({ status: false, message: "Error", error: err.message })
       }
 }
 const getCollegeDetails= async function(req, res) {
      try{
          let data= req.query.name;
          console.log(data);
          let collegeDetails=await collegeModel.findOne({name:data})
            //console.log(collegeDetails)
          let details = await internModel.find({collegeId:collegeDetails._id}).select({_id:1,name:1,email:1,mobile:1})
          console.log(details)
          collegeDetails ={
            name: collegeDetails.name,
            fullName:collegeDetails.fullName, 
            logoLink:collegeDetails.logoLink,
            interns:details
          }

          return res.status(200).send({status:true,data:collegeDetails})
    
      }catch(err){
          res.status(500).send({msg:err.messege})
      }
  }
module.exports.createCollege=createCollege
module.exports.getCollegeDetails=getCollegeDetails
const collegeModel= require("../models/collegeModel")
const internModel= require("../models/internModel")
const createIntern=async function(req,res){
  try { 
    let data=req.body
    let savedata = await internModel.create(data)
    res.status(201).send({status:true,data:savedata})
}

catch(err){
    res.status(500).send({msg:err.messege})
}
}
module.exports.createIntern=createIntern
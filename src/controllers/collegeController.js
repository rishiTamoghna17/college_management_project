const collegeModel= require("../models/collegeModel")
const internModel= require("../models/internModel")
const isValid= function(value){
    if(typeof value=="undefined" || value==null) return false
    if(typeof value=="String" && value.trim().length==0)return false
    return true;
}
const createCollege = async function (req, res) { 
    try{
        let data= req.body;
        
    // if (Object.keys(data).length === 0) {
    //     return res.status(400).send({ status: false, message: "Please give some data" });
    //   }
    //     if(!isValid(data.name)){
    //     return res.status(400).send({status:false,messege:"invalid name"})
    //     }
        let savedata = await collegeModel.create(data)
        res.status(201).send({status:true,data:savedata})
    } 
    catch(err){
        res.status(500).send({msg:err.messege})
    }
}




module.exports.createCollege=createCollege
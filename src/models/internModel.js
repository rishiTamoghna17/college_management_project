const mongoose=require('mongoose')
const collegeModel = require('./collegeModel')
const ObjectId=mongoose.Schema.Types.ObjectId
const internModelSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    mobile:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    collegeId:{
        type:ObjectId,
        ref:'collegeModel'
    },
    isDeleted:{
        type:Boolean,
        default:false
    }},
    {timestamps: true
})
module.exports=mongoose.model('internModel',internModelSchema)
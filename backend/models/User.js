const mongo=require('mongoose')
const userSchema= new mongo.Schema({
    email:{type:String,require: true,unique:true},
    password:{type:String,reuqire: true,uniqure :true},
})
module.exports=mongo.model("User",userSchema);
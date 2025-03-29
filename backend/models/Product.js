const mongo=require('mongoose');
const productSchema=new mongo.Schema({
    name : {type:String,required : true},
    description : {type:String,required : true},
    category : {type:String,required : true},
    price : {type:Number,required : true},
    rating : {type:Number},
})
module.exports=mongo.model("product",productSchema);
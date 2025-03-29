const mongo=require('mongoose');
const connectMongo= async()=>{
    try{
    await mongo.connect(process.env.MONGO,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    console.log("Mongo Connected");
}catch(error){
    console.log("Mongo Error",error);
}
};
module.exports=connectMongo;
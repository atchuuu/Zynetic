const jwt= require('jsonwebtoken')
const authorization = (req,res,next)=>{
    const token=req.header('Authorization')?.replace('Bearer ','');
    if(!token) return res.status(401).json({msg: 'Token Missing'});
    try{
        const decodedtoken=jwt.verify(token, process.env.JWT);
        req.user=decodedtoken;
        next();
    } 
    catch(err){
        res.status(401).json({msg: 'Invalid token.'})
    }
    };
    module.exports=authorization;
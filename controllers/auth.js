require('dotenv').config();
const password = process.env.PASSWORD;

exports.authenticate = (req, res, next) =>{
    if(req.body.password == password){
        res.status(200).json({connect : "true"});
    }
    else{
        res.status(403).json({connect : "false"})
    }
}
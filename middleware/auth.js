const jwt = require('jsonwebtoken')
require('dotenv').config()

const authenticationToken = (req,res,next) => {
    const token = req.header('Authorization').replace('Bearer ', '');
    if(!token){
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }
    try{
        const decode = jwt.verify(token,process.env.JWT_KEY)
        req.user = decode;
        req.userId = decode.userId;

        next();
    } catch(err){
        res.status(400).json({message:'invalid key'})
    }
}

module.exports = authenticationToken;

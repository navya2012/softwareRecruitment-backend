

const jwt = require('jsonwebtoken')
const {  employerSignupModel } = require('../models/userSchema')


const authEmployerUser = async (req,res,next) => {
    // contains all the tokens
    const {authorization} = req.headers
   
    if(!authorization){
        res.status(401).json({error: "Auth token is required"})
    }

    const token = authorization.split(" ")[1]
    if (!token) {
        return res.status(401).json({ error: "Invalid token format" });
    }
    try{
        // checking token entered by user and generated at time of login is same or not 
        const {_id} = jwt.verify(token, process.env.JWT_TOKEN)
        if (!_id) {
            return res.status(401).json({ error: "Invalid token" });
        }
        console.log("middleware", _id)

        //checking id is present in db or not- only checking id
        req.employer = await employerSignupModel.findById(_id).select("_id")
        console.log("checking id ", req.employer)
       
        if (!req.employer) {
            return res.status(401).json({ error: "Employer User not found " });
        }

        //after checking move to next operations
        next()

    }
    catch(err){
        res.status(401).json({error:'Request is not authorized'})
    }
}

module.exports = authEmployerUser
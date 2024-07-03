
const jwt = require("jsonwebtoken")

const createToken = ({_id}) => {
    return jwt.sign({_id}, process.env.JWT_TOKEN ,{
        expiresIn:"30d"
    })
}

module.exports = createToken
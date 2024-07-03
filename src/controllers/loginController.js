const { employeeSignupModel, employerSignupModel } = require("../models/userSchema");

const createToken = require("../utilities/token");

const loginDetails = async (req, res) => {
    const {  email, password,role, } = req.body;

    try {
       
        if (role === 'employer') {
        let   user = await employerSignupModel.login(email, password);
        } else if (role === 'employee') {
            user = await employeeSignupModel.login(email, password);
        } else {
            throw new Error('Invalid role');
        }

        // token
        const token = createToken(user._id)

        res.status(200).json({ user, role, token});
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

module.exports = {
    loginDetails
}
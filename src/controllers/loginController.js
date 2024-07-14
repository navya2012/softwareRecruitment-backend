const { employeeSignupModel, employerSignupModel } = require("../models/userSchema");

const createToken = require("../utilities/token");

const loginDetails = async (req, res) => {
    const {  email, password,role, } = req.body;

    try {
       let user
        if (role === 'employer') {
           user = await employerSignupModel.login(email, password);
        } else if (role === 'employee') {
            user = await employeeSignupModel.login(email, password);
        } else {
            throw new Error('Invalid role');
        }

        // token
        const token = createToken(user._id)

        // let transformedUser = user.toObject(); // Convert Mongoose document to plain object
        // if (role === 'employee') {
        //     transformedUser.employee_id = transformedUser._id;
        // } else if (role === 'employer') {
        //     transformedUser.employer_id = transformedUser._id;
        // }
        // delete transformedUser._id;

        // res.status(200).json({ user: transformedUser, role, token });

        res.status(200).json({ user, role, token});
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

module.exports = {
    loginDetails
}
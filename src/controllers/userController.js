const { userDetailsModel } = require("../models/usersSchema")
const createToken = require("../utilities/token")
const { check, validationResult } = require('express-validator');


// Validation rules for sign-up
const signupValidation = [
    check('email').optional().trim().isEmail().withMessage('Invalid email address'),
    check('mobileNumber').optional().isNumeric()
        .isLength({ min: 10, max: 10 })
        .withMessage('InValid Number!!,number must contain only 10 digits'),
    check('password').optional()
        .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long')
        .matches(/[a-z]/).withMessage('Password must contain a lowercase letter')
];


//user sign up
const userSignupDetails = async (req, res) => {
    const { role, email, password, mobileNumber, companyName, companyType, address, firstName, lastName }
        = req.body

    try {
        // Validation check
        const error = validationResult(req).formatWith(({ msg }) => {
            return { msg };
        });
        if (!error.isEmpty()) {
            return res.status(400).json({ error: error.array() });
        }

        // store data into db+
        const signUpDetails = await userDetailsModel.signup(role, email, password, mobileNumber, companyName, companyType, address, firstName, lastName)

        //token
        const token = createToken({ _id: signUpDetails._id, role: signUpDetails.role });

        res.status(200).json({ signUpDetails, token })
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
}

//user login
const userLoginDetails = async (req, res) => {
    const { email, password } = req.body;

    try {
        // store data into db+
        const loginDetails = await userDetailsModel.login(email, password);

        //token
        const token = createToken({ _id: loginDetails._id, role: loginDetails.role });

        res.status(200).json({ 
            _id:loginDetails._id,
            role:loginDetails.role,
            email:loginDetails.email,
            mobileNumber:loginDetails.mobileNumber,
            token
         });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

//update
const updateUserDetails = async (req, res) => {
    const id = req.params.id; 
    const { role } = req.user; 
    //console.log("update details", role)
    try {
        // Validation check (if needed)
        const error = validationResult(req).formatWith(({ msg }) => {
            return { msg };
        });
        if (!error.isEmpty()) {
            return res.status(400).json({ error: error.array() });
        }

        // Depending on the role, update different user details
        if (!id) {
            return res.status(404).json({ error: ' User ID is not provided' });
        }

        let updatedUser;
        if (role === "employee") {
            // Example update fields for employee
            const { firstName, lastName, mobileNumber,position, currentCompany, location } = req.body;
            const updateFields = { firstName, lastName, mobileNumber,position, currentCompany, location };

            updatedUser = await userDetailsModel.findByIdAndUpdate(
                { _id: id },
                { $set: updateFields },
                { new: true }
            )

            if (!updatedUser) {
                return res.status(404).json({ error: "Employee User not found" });
            }
        } else if (role === "employer") {
            // Example update fields for employer
            const { companyName, mobileNumber, companyType, address, employeesCount, headQuarters } = req.body;
            const updateFields = { companyName, mobileNumber, companyType, address, employeesCount, headQuarters };

            // Update employer details
            updatedUser = await userDetailsModel.findByIdAndUpdate(
                { _id: id },
                { $set: updateFields },
                { new: true }
            )

            if (!updatedUser) {
                return res.status(404).json({ error: "Employer User not found" });
            }
        } else {
            throw new Error('Invalid role');
        }

        res.status(200).json({ updatedUser });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};


module.exports = {
    userSignupDetails,
    userLoginDetails,
    signupValidation,
    updateUserDetails
}

const { employerSignupModel, employeeSignupModel } = require("../models/userSchema")
const { check, validationResult } = require('express-validator');

const createToken = require("../utilities/token")


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

//employer signup
const employerSignUpDetails = async (req, res) => {
    const { companyName, email, mobileNumber, companyType, password, address } = req.body

    try {
        // Validation check
        const error = validationResult(req).formatWith(({ msg }) => {
            return { msg };
        });
        if (!error.isEmpty()) {
            return res.status(400).json({ error: error.array() });
        }

        // store data into db+
        const employerSignup = await employerSignupModel.signup(companyName, email, mobileNumber, companyType, password, address)

        //token
        const token = createToken(employerSignup._id)

        res.status(200).json({ employerSignup, token })
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
}

//employer signup
const employeeSignUpDetails = async (req, res) => {
    const { firstName, lastName, email, password, mobileNumber } = req.body

    try {
        // Validation check
        const error = validationResult(req).formatWith(({ msg }) => {
            return { msg };
        });
        if (!error.isEmpty()) {
            return res.status(400).json({ error: error.array() });
        }

        // store data into db+
        const employeeSignup = await employeeSignupModel.signup(firstName, lastName, email, password, mobileNumber)

        //token
        const token = createToken(employeeSignup._id)

        res.status(200).json({ employeeSignup, token })

    } catch (err) {
        res.status(400).json({ error: err.message })
    }
}

//update employee details
const updateEmployeeDetails = async (req, res) => {
    const id = req.params.id
    const { firstName, lastName, mobileNumber, role, currentCompany, location } = req.body
    // console.log(id, 'selected id')
    try {
        // Validation check
        const error = validationResult(req).formatWith(({ msg }) => {
            return { msg };
        });
        if (!error.isEmpty()) {
            return res.status(400).json({ error: error.array() });
        }

        // store data into db+
        const updateFields = { firstName, lastName, mobileNumber, role, currentCompany, location };
        await employeeSignupModel.findByIdAndUpdate(
            { _id: id },
          { $set: updateFields},
            { new: true },
        )

        res.status(200).json({ message : "Data Successfully Updated" })

    } catch (err) {
        res.status(400).json({ error: err.message })
    }
}


module.exports = {
    employerSignUpDetails,
    employeeSignUpDetails,
    signupValidation,
    updateEmployeeDetails
}
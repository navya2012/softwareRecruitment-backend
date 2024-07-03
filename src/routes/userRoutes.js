
const express = require("express")


const router = express.Router()

const {employerSignUpDetails, employeeSignUpDetails, signupValidation} = require("../controllers/signupController")
const { loginDetails } = require("../controllers/loginController")

router.post('/employer/signup', signupValidation, employerSignUpDetails )

router.post('/employee/signup', signupValidation, employeeSignUpDetails )

router.post('/login', loginDetails )

module.exports = router
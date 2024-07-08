
const express = require("express")


const router = express.Router()

const {employerSignUpDetails, employeeSignUpDetails, signupValidation, updateEmployeeDetails} = require("../controllers/signupController")
const { loginDetails } = require("../controllers/loginController")

const authUser = require("../middleware/userMiddleware")


//routes
router.post('/employer/signup', signupValidation, employerSignUpDetails )

router.post('/employee/signup', signupValidation, employeeSignUpDetails )

router.post('/login', loginDetails )

router.use(authUser)

router.patch('/employee/updateDetails/:id', signupValidation, updateEmployeeDetails )

module.exports = router
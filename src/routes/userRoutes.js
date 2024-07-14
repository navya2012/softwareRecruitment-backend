
const express = require("express")


const router = express.Router()

const {employerSignUpDetails, employeeSignUpDetails, signupValidation, updateEmployeeDetails, updateEmployerDetails} = require("../controllers/signupController")
const { loginDetails } = require("../controllers/loginController")

const authUser = require("../middleware/userMiddleware")

const { workingExperienceController } = require("../controllers/workingExperienceController")
const { getJobRecruitmentPosts, createJobRecruitmentPosts } = require("../controllers/jobRecruitmentController")
const authEmployerUser = require("../middleware/authEmployerUser")


//routes
router.post('/employer/signup', signupValidation, employerSignUpDetails )

router.post('/employee/signup', signupValidation, employeeSignUpDetails )

router.post('/login', loginDetails )



router.patch('/employee/updateDetails/:id', authUser, signupValidation, updateEmployeeDetails )
router.post('/employee/working-experience/:id?', authUser, workingExperienceController);

router.get('/employee/get-recruitment-posts',  getJobRecruitmentPosts);

router.post('/employer/create-recruitment-posts', authEmployerUser, createJobRecruitmentPosts);
router.patch('/employer/updateDetails/:id', authEmployerUser, signupValidation, updateEmployerDetails )


module.exports = router
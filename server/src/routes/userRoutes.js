
const express = require("express")

const router = express.Router()

const { userSignupDetails, signupValidation, userLoginDetails, verifyOtp } = require("../controllers/userController")
const { workingExperienceController } = require("../controllers/workingExperienceController")
const { createJobRecruitmentPosts, updateJobRecruitmentPosts, getJobRecruitmentPosts, updateJobAppliedStatus } = require("../controllers/jobRecruitmentController")
const updateUserDetails = require("../controllers/updateUserController")
const { authUserDetails, authUser } = require("../middleware/authUserMiddleware")


//routes
router.post('/signup', signupValidation, userSignupDetails)
router.post('/verify-otp', authUser, verifyOtp)
router.post('/login', userLoginDetails)

//update details
router.patch('/employee/update-details', authUserDetails('employee'), signupValidation, updateUserDetails )
router.patch('/employer/update-details', authUserDetails('employer'), signupValidation, updateUserDetails )

//working experience
router.post('/employee/working-experience', authUserDetails('employee'), workingExperienceController);

// job posts
router.post('/employer/create-recruitment-posts', authUserDetails('employer'), createJobRecruitmentPosts);
router.get('/employee/get-recruitment-posts',  getJobRecruitmentPosts);
router.patch('/employee/update-job-applied-status/:id', authUserDetails('employee'), updateJobAppliedStatus )
router.patch('/employer/update-recruitment-posts/:id', authUserDetails('employer'), updateJobRecruitmentPosts )




module.exports = router
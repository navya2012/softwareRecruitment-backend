
const express = require("express")

const router = express.Router()

const { userSignupDetails, signupValidation, userLoginDetails, updateUserDetails } = require("../controllers/userController")
const authUserDetails = require("../middleware/authUserMiddleware")
const { workingExperienceController } = require("../controllers/workingExperienceController")
const { createJobRecruitmentPosts, updateJobRecruitmentPosts, getJobRecruitmentPosts } = require("../controllers/jobRecruitmentController")



//routes
router.post('/signup', signupValidation, userSignupDetails)
router.post('/login', userLoginDetails)

//update details
router.patch('/employee/updateDetails/:id', authUserDetails('employee'), signupValidation, updateUserDetails )
router.patch('/employer/updateDetails/:id', authUserDetails('employer'), signupValidation, updateUserDetails )

//working experience
router.post('/employee/working-experience/:id?', authUserDetails('employee'), workingExperienceController);

// job posts
router.post('/employer/create-recruitment-posts', authUserDetails('employer'), createJobRecruitmentPosts);
router.get('/employee/get-recruitment-posts',  getJobRecruitmentPosts);
router.patch('/employee/update-recruitment-posts/:id', authUserDetails('employee'), updateJobRecruitmentPosts )





module.exports = router
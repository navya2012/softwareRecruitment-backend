const { jobRecruitmentModel } = require("../models/recruitmentSchema")


//get recruitment posts
const getJobRecruitmentPosts = async (req, res) => {
    //const employee_id = req.employee._id
    // console.log( "get Posts", employee_id)
    try {
        const getJobPostsData = await jobRecruitmentModel.find()
        res.status(200).json({ getJobPostsData })
    }
    catch (err) {
        res.status(400).json({ error: err.message })
    }
}


//post recruitment posts
const createJobRecruitmentPosts = async (req, res) => {
    const { companyName, role, technologies, experience, location, graduate, language, noticePeriod } = req.body

    const employer_id = req.employer._id
    console.log("create Posts", employer_id)
    try {
        const createPostFields = { employer_id, companyName, role, technologies, experience, location, graduate, language, noticePeriod }

        const newJobPostData = new jobRecruitmentModel(createPostFields)
        await newJobPostData.save()

        res.status(201).json({ newJobPostData })
    }
    catch (err) {
        res.status(400).json({ error: err.message })
    }
}


module.exports = {
    getJobRecruitmentPosts,
    createJobRecruitmentPosts
}
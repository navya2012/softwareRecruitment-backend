const { jobRecruitmentModel } = require("../models/recruitmentSchema")


//get recruitment posts
const getJobRecruitmentPosts = async (req, res) => {
    try {
        const getJobPostsData = await jobRecruitmentModel.find()
        res.status(200).json({ getJobPostsData })
    }
    catch (err) {
        res.status(400).json({ error: err.message })
    }
}

//update job applied status by employee
const updateJobAppliedStatus = async (req, res) => {
    const jobId = req.params.id
    const employee_id = req.user._id
    try {

        if (!jobId) {
            return res.status(404).json({ error: 'Job Post ID is not provided' });
        }

        const updatedJobPosts = await jobRecruitmentModel.findOneAndUpdate(
            { _id: jobId, },
            {
                $set: {
                    "jobAppliedStatus": "Applied",
                    "employee_id": employee_id
                }
            },
            { new: true }
        );

        if (!updatedJobPosts) {
            return res.status(404).json({ error: "Job post not found" });
        }

        res.status(200).json({
            _id: jobId,
            jobAppliedStatus: updatedJobPosts.jobAppliedStatus,
            employee_id: updatedJobPosts.employee_id

        });

    }
    catch (err) {
        res.status(400).json({ error: err.message })
    }
}


//post recruitment posts
const createJobRecruitmentPosts = async (req, res) => {
    const { companyName, role, technologies, experience, location, graduate, language, noticePeriod } = req.body
    const employer_id = req.user._id

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

//update job recruitment posts by employer
const updateJobRecruitmentPosts = async (req, res) => {
    const jobId = req.params.id
    const { companyName, role, technologies, experience, location, graduate, language, noticePeriod } = req.body
    try {

        if (!jobId) {
            return res.status(404).json({ error: 'Job Post ID is not provided' });
        }

        const updateRecruitmentPosts = { companyName, role, technologies, experience, location, graduate, language, noticePeriod }
        const updatedRecruitmentPosts = await jobRecruitmentModel.findOneAndUpdate(
            { _id: jobId },
            { $set: updateRecruitmentPosts },
            { new: true }
        );

        if (!updatedRecruitmentPosts) {
            return res.status(404).json({ error: "Job post not found" });
        }

        res.status(200).json({ updatedRecruitmentPosts });

    }
    catch (err) {
        res.status(400).json({ error: err.message })
    }
}
module.exports = {
    getJobRecruitmentPosts,
    createJobRecruitmentPosts,
    updateJobAppliedStatus,
    updateJobRecruitmentPosts
}
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
            employee_id: updatedJobPosts.employee_id,
            message:'Applied for this Job'
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

        res.status(201).json({message:"Posted Successfully", newJobPostData })
    }
    catch (err) {
        res.status(400).json({ error: err.message })
    }
}

//get recruitment posts - employer
const getJobPosts = async (req, res) => {
    const employer_id = req.user._id
    try {

        const getJobPostsList =  await jobRecruitmentModel.find({employer_id})
        res.status(200).json({getJobPostsList })
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

        res.status(200).json({ message:"Updated Job Post Successfully", updatedRecruitmentPosts });

    }
    catch (err) {
        res.status(400).json({ error: err.message })
    }
}

//delete
const deleteJobPosts = async (req, res) => {
    const employer_id = req.user._id;
    const jobId = req.params.id;

    try {
        // Find and delete the job post that matches both employer_id and jobId
        const result = await jobRecruitmentModel.findOneAndDelete({
            _id: jobId,
            employer_id: employer_id
        });

        // Check if a document was found and deleted
        if (!result) {
            return res.status(404).json({ message: "Job post not found" });
        }

        res.status(200).json({ message: "Job post successfully deleted."});
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
}



module.exports = {
    getJobRecruitmentPosts,
    createJobRecruitmentPosts,
    updateJobAppliedStatus,
    updateJobRecruitmentPosts,
    getJobPosts,
    deleteJobPosts
}
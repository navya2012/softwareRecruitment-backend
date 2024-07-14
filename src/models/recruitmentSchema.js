
const mongoose = require('mongoose')


const recruitmentSchema = mongoose.Schema({
    companyName: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    technologies: {
        type: String,
        required: true
    },
    experience: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    graduate: {
        type: String,
        required: true
    },
    language: {
        type: String,
        required: true
    },
    noticePeriod: {
        type: String,
        required: true
    },
    employer_id: {
        type: String,
        required: true
    },
    jobApplied: [
        {
            status: {
                type: String,
                enum: ['Applied', 'Denied'],
                required: true
            },
            employee_id: {
                type: String,
                required: true
            }
        }
    ]
},
    { timestamp: true }
)

const jobRecruitmentModel = new mongoose.model("jobRecruitment", recruitmentSchema)

module.exports = {
    jobRecruitmentModel
}
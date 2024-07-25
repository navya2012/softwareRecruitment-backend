const { workingExperienceModel } = require("../models/workingExperienceSchema");

const workingExperienceController = async (req, res) => {
    const { technologies, experience, location, graduate, language, noticePeriod } = req.body;
    const employee_id = req.user._id;  // Get employee ID from authenticated user

    try {
        const fieldsUpdate = { employee_id, technologies, experience, location, graduate, language, noticePeriod };

        // Find if there is an existing working experience for this user
        let workingExperienceData = await workingExperienceModel.findOne({ employee_id });

        if (workingExperienceData) {
            // If found, update the existing entry
            workingExperienceData = await workingExperienceModel.findByIdAndUpdate(
               { _id: workingExperienceData._id},
                { $set: fieldsUpdate },
                { new: true, runValidators: true }
            );

            if (!workingExperienceData) {
                return res.status(404).json({ error: "Employee User not found" });
            }
        } else {
            // If not found, create a new entry
            workingExperienceData = new workingExperienceModel(fieldsUpdate);
            await workingExperienceData.save();
        }

        res.status(200).json({ workingExperienceData });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

module.exports = {
    workingExperienceController
};

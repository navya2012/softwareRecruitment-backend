
const { workingExperienceModel } = require("../models/workingExperienceSchema")


const workingExperienceController = async (req, res) => {
    const id = req.params.id;
    const { technologies, experience, location, graduate, language, noticePeriod } = req.body
    const employee_id =   req.user._id

    try{
        const fieldsUpdate = { employee_id, technologies, experience, location, graduate, language, noticePeriod  }

        let workingExperienceData;
        if (id) {
          workingExperienceData = await workingExperienceModel.findByIdAndUpdate(
                 { _id: id },
                { $set : fieldsUpdate },
                { new: true , runValidators : true}
            );

            if (!workingExperienceData) {
                return res.status(404).json({ error: "Employee User not found" });
            }
        } else {
            workingExperienceData = new workingExperienceModel(fieldsUpdate);
            await workingExperienceData.save();
        }

        res.status(200).json({ workingExperienceData });
    }
    catch(err){
        res.status(400).json({error:err.message})
    }
}   

module.exports = {
    workingExperienceController
}






const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

// employer schema
const AddressSchema = mongoose.Schema({
    street: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    zipCode: {
        type: Number,
        required: true
    },
    country: {
        type: String,
        required: true
    }
});

const employerSignupSchema = mongoose.Schema({
    companyName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    mobileNumber: {
        type: Number,
        required: true,
        minlength: 10
    },
    companyType: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    },
    address: {
        type: AddressSchema,
        required: true
    },
    employeesCount:{
        type:Number
    },
    headQuarters:{
        type: String
    }
},
    { timestamp: true }
)

//employee signup
const employeeSignupSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    },
    mobileNumber: {
        type: Number,
        required: true,
        minlength: 10
    },
    role:{
        type :String,
    },
    currentCompany:{
        type:String,
    },
    location:{
        type:String,
    }
},
    { timestamp: true }
)


// employer static signup function
employerSignupSchema.statics.signup = async (companyName, email, mobileNumber, companyType, password, address) => {

    // checking user exists or not
    const exists = await employerSignupModel.findOne({ email })
    if (exists) {
        throw Error("Email already exists!")
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const employerSignup = await employerSignupModel.create({ companyName, email, mobileNumber, companyType, password: hash, address })
    return employerSignup
}

employeeSignupSchema.statics.signup = async (firstName, lastName, email, password, mobileNumber) => {

    // checking user exists or not
    const exists = await employeeSignupModel.findOne({ email })
    if (exists) {
        throw Error("Email already exists!")
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const employeeSignup = await employeeSignupModel.create({ firstName, lastName, email, password: hash, mobileNumber })
    return employeeSignup
}

// employer static login function
employerSignupSchema.statics.login = async (email, password) => {

    //checking user matches or not
    const userDetails = await employerSignupModel.findOne({ email })
    if (!userDetails) {
        throw Error("Incorrect Email!")
    }

    // checking user-input password and hash password
    const match = await bcrypt.compare(password, userDetails.password)
    if (!match) {
        throw Error("Incorrect password!")
    }
    return userDetails
}

// employee static login function
employeeSignupSchema.statics.login = async (email, password) => {

    //checking user matches or not
    const userDetails = await employeeSignupModel.findOne({ email })
    if (!userDetails) {
        throw Error("Incorrect Email!")
    }

    // checking user-input password and hash password
    const match = await bcrypt.compare(password, userDetails.password)
    if (!match) {
        throw Error("Incorrect password!")
    }
    return userDetails
}

const employerSignupModel = new mongoose.model("EmployerSignup", employerSignupSchema)
const employeeSignupModel = new mongoose.model("EmployeeSignup", employeeSignupSchema)

module.exports = {
    employerSignupModel,
    employeeSignupModel
}
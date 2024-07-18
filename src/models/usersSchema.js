
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

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

const userDetailsSchema = mongoose.Schema({
    role:{
        type:String,
        enum:['employer','employee'],
        required:true
    },
    email: {
        type: String,
        required: true,
        unique: true
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

    //employer
    companyName: {
        type: String,
    },   
    companyType: {
        type: String,
    },  
    address: {
        type: AddressSchema,
    },
    employeesCount:{
        type:Number
    },
    headQuarters:{
        type: String
    },

    //employee
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    position:{
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


// users static signup function
userDetailsSchema.statics.signup = async (role, email, password, mobileNumber,  companyName, companyType, address, firstName, lastName ) => {

    // checking user exists or not
    const exists = await userDetailsModel.findOne({ email })
    if (exists) {
        throw Error("Email already exists!")
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const userSignup = await userDetailsModel.create({role, email, mobileNumber, role, companyName, companyType, address, firstName, lastName, password: hash })

    return userSignup
}

// users static login function
userDetailsSchema.statics.login = async  (email, password) => {
    // Check if user exists
    const userLogin = await userDetailsModel.findOne({ email });
    if (!userLogin) {
        throw Error("Incorrect Email!");
    }

    // Compare password
    const match = await bcrypt.compare(password, userLogin.password);
    if (!match) {
        throw Error("Incorrect password!");
    }
    return userLogin;
};

const userDetailsModel = new mongoose.model("UserDetails", userDetailsSchema)

module.exports = {
    userDetailsModel
}

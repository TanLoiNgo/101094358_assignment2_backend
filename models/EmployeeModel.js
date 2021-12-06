const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
    employeeId: {
        type: Number,
        require: true
    },
    firstName: {
        type: String,
        require: true,
        trim: true,
        lowercase: true
    },
    lastName: {
        type: String,
        require: true,
        trim: true,
        lowercase: true
    },
    emailId: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: true,
        // validateEmail: [true, 'Please fill a valid email address'],
        // match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    }

});

const EmployeeModel = mongoose.model("assignment2_employee", EmployeeSchema);
module.exports = EmployeeModel;
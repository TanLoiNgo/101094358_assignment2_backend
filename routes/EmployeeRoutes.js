const express = require('express');
const employeeModel = require('../models/EmployeeModel.js');
const app = express();

function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

// Create a new Employee
app.post('/api/v1/employees', async (req, res) => {
    const employee = new employeeModel(req.body);

    // Validate request
    if (!req.body.firstName) {
        return res.status(400).send({
            message: "First name can not be empty"
        });
    } else if (!req.body.lastName) {
        return res.status(400).send({
            message: "Last name can not be empty"
        });
    } else if (!req.body.emailId) {
        return res.status(400).send({
            message: "Email can not be empty"
        });
    } else if (!validateEmail(req.body.emailId)) {
        return res.status(400).send({
            message: "Please enter a valid email address"});
    } else {
        try {
            //add new employee
            await employee.save();
            res.status(201).send("New employee added");
        } catch (err) {
            res.status(500).send(err);
        }
    }





});

// Retrieve all Employees
app.get('/api/v1/employees', async (req, res) => {
    const employees = await employeeModel.find({});

    if (employees == '') {
        res.status(400).send("No employee");
    }
    else {
        try {
            res.send(employees);
        } catch (err) {
            res.status(500).send(err);
        }
    }

});

//Retrieve a single employee with employeeId
app.get('/api/v1/employees/:employeeId', async (req, res) => {
    //TODO - Write your code here to return only one note using noteid
    const employee = await employeeModel.findOne({employeeId: req.params.employeeId});

    if (employee == '') {
        res.status(400).send("No employee with id "+ req.params.employeeId);
    }else if (!req.params.employeeId) {
        return res.status(400).send({
            message: "Please enter employee Id to view"
        });
    }
    try {
        res.send(employee);
    } catch (err) {
        res.status(500).send(err)
    }
});

//Update a Employee with EmployeeId
app.put('/api/v1/employees/:employeeId', async (req, res) => {
    try {
        const employee = await employeeModel.findOneAndUpdate({employeeId: req.params.employeeId}, req.body)
        await employee.save()
        res.status(200).send("Employee Updated")
    } catch (err) {
        res.status(500).send(err)
    }
})

//TODO - Delete a Note with noteId
app.delete('/api/v1/employees/:employeeId', async (req, res) => {
    // Validate request
    if (!req.params.employeeId) {
        return res.status(400).send({
            message: "Please enter employee Id to delete"
        });
    }
    //Delete the employee using employeeId
    try {
        const employee = await employeeModel.findOneAndDelete({employeeId:req.params.employeeId})

        if (!employee) {
            res.status(404).send("No item found")
        } else {
            res.status(404).send("Employee with id " + req.params.employeeId + " was deleted successfully.")
        }
        res.status(200).send()
    } catch (err) {
        res.status(500).send(err)
    }
});

module.exports = app
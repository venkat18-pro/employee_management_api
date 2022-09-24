module.exports = function (db, jwt) {
    const bcrypt = require("bcrypt");
    
    const userService = require("../Api/service/userService")(db)
    const userControl = require("../Api/control/userController")(userService, bcrypt, jwt)

    const managerService = require("../Api/service/managerService")(db)
    const managerControl = require("../Api/control/managerController")(managerService, bcrypt)

    const employeeService = require("../Api/service/employeeService")(db)
    const employeeControl = require("../Api/control/employeeController")(employeeService, bcrypt)

    return {
        //User Process
        userProcessLogin: (req, res) => {
            userControl.userControlLogin(req, res);
        },
        userProcessList: (req, res) => {
            userControl.userControlList(req, res);
        },
        userProcessGetOneList: (req, res) => {
            userControl.userControlGetOneList(req, res);
        },
        userProcessAdd: (req, res) => {
            userControl.userControlAdd(req, res)
        },
        userProcessUpdate: (req, res) => {
            userControl.userControlUpdate(req, res)
        },
        userProcessDelete: (req, res) => {
            userControl.userControlDelete(req, res)
        },

        //Manager Process
        managerProcessList: (req, res) => {
            managerControl.managerControlList(req, res);
        },
        managerProcessGetOneList: (req, res) => {
            managerControl.managerControlGetOneList(req, res);
        },
        managerProcessAdd: (req, res) => {
            managerControl.managerControlAdd(req, res)
        },
        managerProcessUpdate: (req, res) => {
            managerControl.managerControlUpdate(req, res)
        },
        managerProcessDelete: (req, res) => {
            managerControl.managerControlDelete(req, res)
        },
        managerUserBasedList: (req, res) => {
            managerControl.managerControlUserBasedList(req, res)
        },

        //employee Process
        employeeProcessList: (req, res) => {
            employeeControl.employeeControlList(req, res);
        },
        employeeProcessGetOneList: (req, res) => {
            employeeControl.employeeControlGetOneList(req, res);
        },
        employeeProcessAdd: (req, res) => {
            employeeControl.emopolyeeControlAdd(req, res)
        },
        employeeProcessUpdate: (req, res) => {
            employeeControl.employeeControlUpdate(req, res)
        },
        employeeProcessDelete: (req, res) => {
            employeeControl.employeeControlDelete(req, res)
        },
        employeeManagerBasedList: (req, res) => {
            employeeControl.employeeControlManagerBasedList(req, res)
        },
        employeeUserBasedList: (req, res) => {
            employeeControl.employeeControlUserBasedList(req, res)
        }
    }
}
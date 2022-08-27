module.exports = function (db, config, router, jwt) {

    const route = config.routes.employee;
    const employeeProcess = require("../process")(db)
    const authentication = require("../Authentication/auth")(jwt)

    router.get(route.employeeList, employeeProcess.employeeProcessList)
    router.get(route.employeeGetOneList, authentication.verifyToken, employeeProcess.employeeProcessGetOneList)
    router.post(route.employeeAdd, authentication.verifyToken, employeeProcess.employeeProcessAdd)
    router.put(route.employeeUpdate, authentication.verifyToken, employeeProcess.employeeProcessUpdate)
    router.delete(route.employeeDelete, employeeProcess.employeeProcessDelete)
    router.get(route.employeeManagerBasedList, employeeProcess.employeeManagerBasedList)
    router.get(route.employeeUserBasedList, authentication.verifyToken, employeeProcess.employeeUserBasedList)

}
module.exports = function (db, config, router, jwt) {

    const route = config.routes.manager;
    const managerProcess = require("../process")(db)
    const authentication = require("../Authentication/auth")(jwt)

    router.get(route.managerList, managerProcess.managerProcessList)
    router.get(route.managerGetOneList, authentication.verifyToken,managerProcess.managerProcessGetOneList)
    router.post(route.managerAdd, authentication.verifyToken, managerProcess.managerProcessAdd)
    router.put(route.managerUpdate, authentication.verifyToken, managerProcess.managerProcessUpdate)
    router.delete(route.managerDelete, managerProcess.managerProcessDelete)
    router.get(route.managerUserBasedList, authentication.verifyToken, managerProcess.managerUserBasedList) 

}
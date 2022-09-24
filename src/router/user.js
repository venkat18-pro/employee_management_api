module.exports = function (db, config, router, jwt) {

    const route = config.routes.user;
    const userProcess = require("../process")(db, jwt)
    const authentication = require("../Authentication/auth")(jwt)

    router.post(route.userLogin, userProcess.userProcessLogin)
    router.get(route.userList, userProcess.userProcessList)
    router.get(route.userGetOneList, authentication.verifyToken, userProcess.userProcessGetOneList)
    router.post(route.userAdd, userProcess.userProcessAdd)
    router.put(route.userUpdate, userProcess.userProcessUpdate)
    router.put(route.userDelete, userProcess.userProcessDelete)

}
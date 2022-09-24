module.exports = function (db) {
    return {
        employeeServiceList: function () {
            return new Promise((resovle, reject) => {
                db.query({
                    sql: "SELECT * FROM `employee` WHERE isDeleted = 0",
                    timeout: 40000
                }, function (err, data, fields) {
                    if (err) reject(err);
                    if (data.length === 0) {
                        reject(err)
                    }
                    resovle(data);
                })
            })
        },

        employeeServiceGetOneList: (employeeID) => {
            return new Promise((resovle, reject) => {
                db.query({
                    sql: "SELECT firstname, lastname, email, phoneno, country, pincode, location, manager FROM `employee` WHERE id = ? AND isDeleted = 0",
                    values: [employeeID]
                }, (err, data, fields) => {
                    if (err) reject(err);
                    if (data.length === 0) {
                        reject(err)
                    }
                    resovle(data);
                })
            })
        },

        employeeServiceAdd: (employeeInfo, userID, createTime, modifyTime, locationArray) => {
            return new Promise((resovle, reject) => {
                db.query({
                    sql: "INSERT INTO `employee` (firstname, lastname, email, phoneno, country, pincode, location, userID, createdAt, modifyAt, manager, managerID) value (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
                    timeout: 40000,
                    values: [employeeInfo.firstName, employeeInfo.lastName, employeeInfo.email, employeeInfo.phoneNo, employeeInfo.country, employeeInfo.pincode, locationArray, userID, createTime, modifyTime, employeeInfo.managerName, employeeInfo.managerID]
                }, (err, data, fields) => {
                    if (err) reject(err);
                    resovle(data)
                })
            })
        },

        employeeServiceUpdate: (employeeData, modifyTime, locationArray, id) => {
            return new Promise((resovle, reject) => {
                db.query({
                    sql: "UPDATE `employee` SET firstname = ?, lastname= ?, email= ?, phoneno = ?, country = ?, pincode = ?, location = ?, modifyAt = ?, manager = ?, managerID = ? WHERE id = ? AND isDeleted = 0",
                    timeout: 40000,
                    values: [employeeData.firstName, employeeData.lastName, employeeData.email, employeeData.phoneNo, employeeData.country, employeeData.pincode, locationArray, modifyTime, employeeData.managerName, employeeData.managerID, id]
                }, (err, data, fields) => {
                    if (err) {
                        reject(err);
                    }
                    if (data.affectedRows === 0) {
                        reject(err)
                    }
                    resovle(data)
                })
            })

        },

        employeeServiceDelete: (isDelete, id) => {
            return new Promise((resovle, reject) => {
                db.query({
                    sql: "UPDATE `employee` SET isDeleted = ? WHERE id = ? AND isDeleted = 0",
                    values: [isDelete, id]
                }, (err, data, fields) => {
                    if (err) reject(err);
                    if (data.affectedRows === 0) {
                        reject(err)
                    }
                    resovle(data)
                })
            })

        },

        employeeServiceManagerBasedList: (id) => {
            return new Promise((resovle, reject) => {
                db.query({
                    sql: "SELECT * FROM `employee` WHERE managerID = ? AND isDeleted = 0",
                    values: [id]
                }, (err, data, fields) => {
                    if (err) reject(err);
                    if (data.length === 0) {
                        reject(err)
                    }
                    resovle(data);
                })
            })
        },

        employeeServiceUserBasedList: (userID) => {
            return new Promise((resovle, reject) => {
                db.query({
                    sql: "SELECT firstname, lastname, email, phoneno, manager, id FROM `employee` WHERE userID = ? AND isDeleted = 0",
                    values: [userID]
                }, (err, data, fields) => {
                    if (err) reject(err);
                    if (data.length === 0) {
                        reject(err)
                    }
                    resovle(data);
                })
            })
        }
    }
}
module.exports = function (db) {
    return {
        managerServiceList: function () {
            return new Promise((resovle, reject) => {
                db.query({
                    sql: "SELECT * FROM `manager` WHERE isDeleted = 0"
                }, function (err, data, fields) {
                    if (err) reject(err);
                    if (data.affectedRows === 0) {
                        reject(err)
                    }
                    resovle(data);
                })
            })
        },

        managerServiceGetOneList: (managerID) => {
            return new Promise((resovle, reject) => {
                db.query({
                    sql: "SELECT * FROM `manager` WHERE managerID = ? AND isDeleted = 0",
                    values: [managerID]
                }, (err, data, fields) => {
                    if (err) reject(err);
                    if (data.affectedRows === 0) {
                        reject(err)
                    }
                    resovle(data);
                })
            })
        },

        managerServiceAdd: (managerInfo, hasedPassword, userID, createTime, modifyTime) => {
            return new Promise((resovle, reject) => {
                db.query({
                    sql: "INSERT INTO `manager` (userID, managername, manageremail, managerpassword, createdAt, modifyAt) value (?, ?, ?, ?, ?, ?)",
                    values: [userID, managerInfo.name, managerInfo.email, hasedPassword, createTime, modifyTime]
                }, (err, data, fields) => {
                    if (err) reject(err);
                    if (data === undefined) {
                        reject(err)
                    }
                    resovle(data)
                })
            })
        },

        managerServiceUpdate: (managerData, managerID) => {
            return new Promise((resovle, reject) => {
                db.query({
                    sql: "UPDATE `manager` SET managername = ?, manageremail= ?  WHERE managerID = ? AND isDeleted = 0",
                    values: [managerData.name, managerData.email, managerID]
                }, async (err, data, fields) => {
                    if (err) {
                        console.log(err)
                        reject(err);
                    }
                    if (data.affectedRows === 0) {
                        reject(err)
                    }
                    resovle(data)
                })
            })

        },

        managerServiceDelete: (isDelete, managerID) => {
            return new Promise((resovle, reject) => {
                db.query({
                    sql: "UPDATE `manager` SET isDeleted = ? WHERE managerID = ? AND isDeleted = 0",
                    values: [isDelete, managerID]
                }, (err, data, fields) => {
                    if (err) reject(err);
                    if (data.affectedRows == 0) {
                        reject(err)
                    }
                    resovle(data)
                })
            })

        },

        managerServiceUserBasedList: (userID) => {
            return new Promise((resovle, reject) => {
                db.query({
                    sql: "SELECT managername, manageremail, managerID FROM `manager` WHERE userID = ? AND isDeleted = 0",
                    timeout: 40000,
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
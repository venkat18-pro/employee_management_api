module.exports = function (db) {
    return {
        userServiceLogin: function(userInfo){
            return new Promise((resolve, reject) => {
                db.query({
                    sql: "SELECT * FROM `user` WHERE email = ? AND isDeleted = 0",
                    values: [userInfo.email]
                }, function(err, data, fields){
                    if(err) reject(err)
                    if(data.length === 0) reject(err)
                    resolve(data);
                })
            })
        },

        userServiceList: function () {
            return new Promise((resovle, reject) => {
                db.query({
                    sql: "SELECT * FROM `user` WHERE isDeleted = 0"
                }, function (err, data, fields) {
                    if (err) reject(err);
                    if (data.length === 0) {
                        reject(err)
                    }
                    resovle(data);
                })
            })
        },

        userServiceGetOneList: (userId) => {
            return new Promise((resovle, reject) => {
                db.query({
                    sql: "SELECT * FROM `user` WHERE id = ? AND isDeleted = 0",
                    values: [userId]
                }, (err, data, fields) => {
                    if (err) reject(err);
                    if (data.affectedRows === 0) {
                        reject(err)
                    }
                    resovle(data);
                })
            })
        },

        userServiceAdd: (userInfo, hasedPassword) => {
            return new Promise((resovle, reject) => {
                db.query({
                    sql: "INSERT INTO `user` (username, email, password, id, company, isDeleted) value (?, ?, ?, ?, ?, ?)",
                    values: [userInfo.username, userInfo.email, hasedPassword, userInfo.id, userInfo.company, userInfo.isDeleted]
                }, (err, data, fields) => {
                    console.log(data);
                    if (err) {
                        reject(err);
                        console.log(err);
                    }
                    if (data.affectedRows === 0) {
                        reject(err)
                    }
                    resovle(data)
                })
            })
        },

        userServiceUpdate: (userData, id, hasedPassword) => {
            return new Promise((resovle, reject) => {
                db.query({
                    sql: "UPDATE `user` SET username = ?, email = ?, password= ?, company= ? WHERE id = ? AND isDeleted = 0",
                    values: [userData.username, userData.email, hasedPassword, userData.company, id]
                }, (err, data, fields) => {
                    if (err) reject(err);
                    if (data.affectedRows === 0) {
                        reject(err)
                    }
                    resovle(data)
                })
            })

        },

        userServiceDelete: (isDelete, id) => {
            return new Promise((resovle, reject) => {
                db.query({
                    sql: "UPDATE `user` SET isDeleted = ? WHERE id = ? AND isDeleted = 0",
                    values: [isDelete, id]
                }, (err, data, fields) => {
                    if (err) reject(err);
                    if (data.affectedRows === 0) {
                        reject(err)
                    }
                    resovle(data)
                })
            })

        }
    }
}
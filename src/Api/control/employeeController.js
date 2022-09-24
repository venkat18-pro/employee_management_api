module.exports = function (employeeService, bcrypt) {

    return {
        employeeControlList: async (req, res) => {
            employeeService.employeeServiceList().then((data) => {
                res.status(200).json({ error: false, Reuslt: data, message: "Get the all user info." })
            }).catch((err) => {
                res.status(400).json({ error: true, message: "Please provide user_id" });
            })
        },

        employeeControlGetOneList: (req, res) => {
            const userId = parseInt(req.params.id);
            if (!userId) {
                return res.status(400).json({ error: true, message: "Please provide." })
            }
            employeeService.employeeServiceGetOneList(userId).then((data) => {
                return res.status(200).json({ error: false, Result: data, message: "Get the user" })
            }).catch((err) => {
                return res.status(400).json({ error: true, message: "Please provide user_id" });
            })
        },

        emopolyeeControlAdd: (req, res) => {

            const employeeInfo = req.body
            if (!employeeInfo || employeeInfo.firstName === undefined || employeeInfo.email === undefined || employeeInfo.firstName === "" || employeeInfo.email === "") {
                return res.status(406).json({ error: true, message: "Employee name and Employee required" });
            }

            const userID = res.get('id')
            const locatonArray = JSON.stringify(employeeInfo.location);
            const createTime = new Date().toISOString().slice(0, 19).replace('T', ' ');
            const modifyTime = new Date().toISOString().slice(0, 19).replace('T', ' ');

            employeeService.employeeServiceAdd(employeeInfo, userID, createTime, modifyTime, locatonArray).then((data) => {
                return res.status(200).json({ error: false, message: "Create the new Employee" })
            }).catch((err) => {
                return res.status(400).json({ error: true, ErrorMessage: err, message: "Employee Not add" });
            })

        },

        employeeControlUpdate: (req, res) => {

            const employeeInfo = req.body;
            if (!employeeInfo || employeeInfo.firstName === undefined || employeeInfo.email === undefined || employeeInfo.firstName === "" || employeeInfo.email === "") {
                return res.status(406).json({ error: true, message: "Employee name and Employee required" });
            }
            console.log(employeeInfo)
            const modifyTime = new Date().toISOString().slice(0, 19).replace('T', " ");
            const locationArray = JSON.stringify(employeeInfo.location);
            const id = parseInt(employeeInfo.employeeID);

            employeeService.employeeServiceUpdate(employeeInfo, modifyTime, locationArray, id).then((data) => {
                return res.status(200).json({ error: false,Result: data, message: "Employee Updated." })
            }).catch((err) => {
                return res.status(400).json({ error: true, ErrorMessage: err, message: "Employee Not Updated." });
            })
        },

        employeeControlDelete: async (req, res) => {
            // if (!req.body) {
            //     return res.status(400).json({ error: true, message: "Please provide user_id" })
            // }
            const id =parseInt(req.params.id);
            const isDelete = 1
            try {
                const data = await employeeService.employeeServiceDelete(isDelete, id)
                return res.status(200).json({ error: false, message: "Success." })
            } catch (err) {
                return res.status(400).json({ error: true, message: "Invalid ID" });
            }
        },

        employeeControlManagerBasedList: async (req, res) => {
            if (!req.body) {
                return res.status(400).json({ error: true, message: "Please provide manager id" })
            }
            const id = req.body.managerID;
            try {
                const data = await employeeService.employeeServiceManagerBasedList(id)
                return res.status(200).json({ error: false, Reuslt: data, message: "Success." })
            } catch (err) {
                return res.status(400).json({ error: true, message: "Invalid Manager ID" });
            }
        },

        employeeControlUserBasedList: (req, res) => {
            // if (!req.body) {
            //     return res.status(400).json({ error: true, message: "Please provide user id" })
            // }
            const userID = res.get("id")
            if (userID === null) {
                return res.status(400).json({ error: true, message: "Please provide user id" })
            }
            employeeService.employeeServiceUserBasedList(userID).then((data) => {
                return res.status(200).json({ error: false, Reuslt: data, message: "Success." })
            }).catch((err) => {
                return res.status(400).json({ error: true, message: "Invalid USer ID" });
            })
        }

    }
}
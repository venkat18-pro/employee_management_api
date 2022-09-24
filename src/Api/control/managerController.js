module.exports = function (managerService, bcrypt) {

    return {
        managerControlList: (req, res) => {
            managerService.managerServiceList().then((data) => {
                res.status(200).json({ error: false, Reuslt: data, message: "Get the all manager info." })
            }).catch((err) => {
                res.status(400).json({ error: true, message: "Please provide manager info" });
            })
        },

        managerControlGetOneList: (req, res) => {
            const managerId = parseInt(req.params.id);
            if (!managerId) {
                return res.status(400).json({ error: true, message: "Please provide manger id." })
            }
            managerService.managerServiceGetOneList(managerId).then((data) => {
                return res.status(200).json({ error: false, Result: data, message: "Get the manager" })
            }).catch((err) => {
                return res.status(400).json({ error: true, message: "Please provide manager_id" });
            })
        },

        managerControlAdd: (req, res) => {
            const managerInfo = req.body
            const userID = res.get('id')
            const createTime = new Date().toISOString().slice(0, 19).replace('T', ' ');
            const modifyTime = new Date().toISOString().slice(0, 19).replace('T', ' ');
            if (!managerInfo || managerInfo.name === undefined || managerInfo.email === undefined || managerInfo.name === "" || managerInfo.email === "") {
                return res.status(406).json({ error: true, message: "User name and email required" });
            }
            const salt = bcrypt.genSaltSync(10)
            const hasedPassword = bcrypt.hashSync(managerInfo.password, salt);

            managerService.managerServiceAdd(managerInfo, hasedPassword, userID, createTime, modifyTime).then((data) => {
                return res.status(201).json({ error: false, message: "Create the new Manager" })
            }).catch((err) => {
                return res.status(400).json({ error: true, error: err, message: "Manager Not add" });
            })
        },

        managerControlUpdate: (req, res) => {
            const managerInfo = req.body;
            const id = managerInfo.managerID
            if (!managerInfo || managerInfo.name === undefined || managerInfo.email === undefined || managerInfo.name === "" || managerInfo.email === "") {
                return res.status(406).json({ error: true, message: "User name and email required" });
            }

            managerService.managerServiceUpdate(managerInfo, id).then((data) => {
                return res.status(200).json({ error: false, message: "Manager Updated." })
            }).catch((err) => {
                return res.status(400).json({ error: true, message: "Manager Not Updated." });
            })
        },

        managerControlDelete: async (req, res) => {
            const managerID = parseInt(req.params.id);
            let isDelete = 1;
            try {
                const data = await managerService.managerServiceDelete(isDelete, managerID)
                return res.status(200).json({ error: false, message: "Success." })
            } catch (err) {
                return res.status(400).json({ error: true, message: "Invalid ID" });
            }
        },

        managerControlUserBasedList: async (req, res) => {
            if (!req.body) {
                return res.status(400).json({ error: true, message: "Please provide user id info" })
            }
            const userID = res.get("id");
            try {
                const data = await managerService.managerServiceUserBasedList(userID)
                return res.status(200).json({ error: false, Reuslt: data, message: "Success." })
            } catch (err) {
                return res.status(400).json({ error: true, message: "Invalid ID" });
            }
        }
    }
}
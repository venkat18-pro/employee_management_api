module.exports = function (userService, bcrypt, jwt) {

    return {
        userControlLogin: (req, res) => {
            const loginInfo = req.body;
            if(!loginInfo){
                return res.status(400).json({ error: true, message: "Please provide valid email and valid password" })
            }
            userService.userServiceLogin(loginInfo).then((data) => {
                const userInfo = data[0]
               const isValid = bcrypt.compareSync(loginInfo.password, userInfo.password)
               if(isValid){
                   const user = {
                       id : userInfo.id,
                       userName : userInfo.username,
                       email : userInfo.email
                   }
                   const accessToken = jwt.sign(user, "VENKat18");
                   res.json({
                       accessToken : accessToken
                   })
               }else {
                res.status(400).json({ error: true, message: "Invalid Password" });
               }

            }).catch((err) => {   
                res.status(400).json({ error: true, message: "Please provide valid email and valid password" });
            })
        },
        
        userControlList: (req, res) => {
            userService.userServiceList().then((data) => {
                res.status(200).json({ error: false, Reuslt: data, message: "Get the all user info." })
            }).catch((err) => {
                console.log(err)
                res.status(400).json({ error: true, message: "Please provide user_id" });
            })
        },

        userControlGetOneList: (req, res) => {
            const userId = res.get('id');
            if (!userId) {
                return res.status(400).json({ error: true, message: "Please provide." })
            }
            userService.userServiceGetOneList(userId).then((data) => {
                return res.status(200).json({ error: false, Result: data, message: "Get the user" })
            }).catch((err) => {
                return res.status(400).json({ error: true, message: "Please provide user_id" });
            })
        },

        userControlAdd: (req, res) => {
            const userInfo = req.body
            if (!userInfo || userInfo.username === undefined || userInfo.email === undefined || userInfo.username === "" || userInfo.email === "" || userInfo.password === undefined || userInfo.password === "") {
                return res.status(406).json({ error: true, message: "User name and email required" });
            }
            
            const salt = bcrypt.genSaltSync(10)
            const hasedPassword = bcrypt.hashSync(userInfo.password, salt);

            userService.userServiceAdd(userInfo, hasedPassword).then((data) => {
                return res.status(201).json({ error: false, message: "Create the New User" })
            }).catch((err) => {
                return res.status(400).json({ error: true, message: "User Not add" });
            })
        },

        userControlUpdate: (req, res) => {
            const userData = req.body;
            const id = parseInt(userData.id)
            if (!userData || userData.username === undefined || userData.email === undefined || userData.username === "" || userData.email === "" || userData.password === undefined || userData === "") {
                return res.status(406).json({ error: true, message: "User name and email required" });
            }
            const salt = bcrypt.genSaltSync(10)
            const hasedPassword = bcrypt.hashSync(userData.password, salt)
            userService.userServiceUpdate(userData, id, hasedPassword).then((data) => {
                return res.status(200).json({ error: false, message: "User Updated." })
            }).catch((err) => {
                return res.status(400).json({ error: true, message: "User Not Updated." });
            })
        },

        userControlDelete: async (req, res) => {
            let isDelete = 1;
            if (!req.body) {
                return res.status(400).json({ error: true, message: "Please provide user_id" })
            }
            const id = parseInt(req.body.id)
            try {
                const data = await userService.userServiceDelete(isDelete, id)
                return res.status(200).json({ error: false, Reuslt: data, message: "Success." })
            } catch (err) {
                return res.status(400).json({ error: true, message: "Invalid ID" });
            }
        }
    }
}
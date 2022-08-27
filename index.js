const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require('cors')
const userRouter = express.Router()
const managerRouter = express.Router()
const employeeRouter = express.Router()
const config = require("./config/config.json").config

const db = require('./database')

const app = express();
const port = config.serverConfig.port;

app.use(express.json())
app.use(express.urlencoded())

app.use((req, res, next) => {
  console.log("Request URL: " + req.originalUrl)
  console.log('Time:',new Date().toISOString().slice(0, 19).replace('T', ' '))
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  next()
})

app.get('/', (req, res) => {
  res.status(200).send("Hello.")
})

app.use("/user", userRouter)
require("./utility/router/user")(db, config, userRouter, jwt)

app.use("/manager", managerRouter)
require("./utility/router/manager")(db, config, managerRouter, jwt)

app.use("/employee", employeeRouter)
require("./utility/router/employee")(db, config, employeeRouter, jwt)

app.listen(port, () => console.log("Server is Runing.."));


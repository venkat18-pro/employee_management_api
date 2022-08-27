const mysql = require('mysql');
const dbConfig = require("./config/config.json").config.dbConfig

const db  = mysql.createConnection({
        host: dbConfig.host,
        user: dbConfig.user,
        password: dbConfig.password,
        database: dbConfig.database,
        port: 3306
    })
    
    db.connect((err) => {
        if(err)
            throw err
        else 
            console.log("DB Connected..")      
    })

module.exports = db;

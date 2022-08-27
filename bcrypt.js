const bcrypt = require("bcrypt");

const saltRounds = 10;
const password = "venkatesh";
const anotherPerson = "venkat"

bcrypt.genSalt(saltRounds, (err, salt) => {
    bcrypt.hash(password, salt, (err, hash) => {
        bcrypt.compare(password, hash, (err, result) => {
            console.log(result)
        })
    })
})
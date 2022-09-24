module.exports = function(jwt){
    return {
        verifyToken: (req, res, next) => { 
            const authHeader = req.headers.authorization;
            const token = authHeader.split(' ')[1]
            if(token === null){
                res.status(401).send("Unauthentication.")
            }
            jwt.verify(token, "VENKat18", (err, decode) => {
                if(err)
                    res.status(401).send("Unauthentication.")
                if(decode === null)
                    res.status(401).send("Unauthentication.")
                res.set({'id' : decode.id})
            })
            next();
        }
    }
}
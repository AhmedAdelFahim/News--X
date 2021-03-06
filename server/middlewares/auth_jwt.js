const jwt = require('jsonwebtoken')

const verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"]
    if (!token) {
        return res.status(403).send({message: "No Token Provided"})
    }
    jwt.verify(token, process.env.SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).send({ message: "Unauthorized!" })
        }
        req.userId = decoded._id
        next();
    })
}

module.exports = {
    verifyToken
}

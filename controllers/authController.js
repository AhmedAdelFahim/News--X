const db = require('../models/index');
const bcrypt = require('bcryptjs');
const User = db.user;
const signup = async (req, res) => {
    const {body:{fullName, password, email}} = req;
        console.log(fullName)
    try {
        const user = await User.create({fullName, password,email});
        const token = user.generateAuthToken()
        return res.status(201).send({
                userId:user._id,
                accessToken: token,
                accessTokenCreationDate: Date.now(),
                accessTokenTTL: 604800 //7 days in seconds [168 hours]
            })
    } catch (e) {
        console.log(e)
        res.status(500).send(e)
    }
}

const signin = async (req, res) => {
    const {body:{password, email}} = req;
    try {
        const user = await User.findOne({email});
        if(!user) {
            return res.status(401).send({error:"Invalid email or password"});
        }
        const isPasswordMatch = await bcrypt.compare(password, user.password)
        if (!isPasswordMatch) {
            return res.status(401).send({error:"Invalid email or password"});
        }
        const token = user.generateAuthToken()

        return res.status(201).send({
            userId:user._id,
            name:user.fullName,
            accessToken: token,
            accessTokenCreationDate: Date.now(),
            accessTokenTTL: 604800 //7 days in seconds [168 hours]
        })

    } catch (e) {
        console.log(e)
        res.status(500).end()
    }
}

module.exports = {
    signup,
    signin
}

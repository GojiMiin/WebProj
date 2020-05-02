require('dotenv').config()
var bcrypt = require('bcrypt')
var jwt = require('jsonwebtoken')
var mongoose = require('mongoose');
User = mongoose.model('Users')
Member = mongoose.model('Member')


exports.loginUser = async function (req, res) {
    const Userdata = await User.findOne({ username: req.body.username })
    if (Userdata == null) {
        return res.status(400).send('Cannot find user')
    }
    try {
        if (await bcrypt.compare(req.body.password, Userdata.password)) {
            const user = {
                username: Userdata.username,
                admin: Userdata.admin,
            }
            const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '30m' })
            res.json({ accessToken: accessToken })
        } else {
            res.send('Not allow')
        }
    }
    catch {
        res.sendStatus(500)
    }

}
exports.afterLog = async function (req, res) {
    const Memberdata = await Member.findOne({ username: req.user.username })
    res.json({
        username: Memberdata.username,
        ProfilePic: Memberdata.ProfilePic
    })
}
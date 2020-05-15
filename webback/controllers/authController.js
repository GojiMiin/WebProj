require('dotenv').config() // use for SECRET_KEY
var bcrypt = require('bcrypt') 
var jwt = require('jsonwebtoken') //use for authentication
var mongoose = require('mongoose');
User = mongoose.model('Users')
Member = mongoose.model('Member')


exports.loginUser = async function (req, res) {
    const Userdata = await User.findOne({ username: req.body.username })
    //if Username didn't exist
    if (Userdata == null) {
        return res.status(400).send('Cannot find user')
    }
    try {
        //Compare Password
        if (await bcrypt.compare(req.body.password, Userdata.password)) {
            const user = {
                username: Userdata.username,
                admin: Userdata.admin,
            }
            //Create accesstoken
            const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '30m' })
            res.json({
                accessToken: accessToken,
                user: user.username
            })
        //if password didn't match
        } else {
            res.send('Not allow')
        }
    }
    catch {
        res.sendStatus(500)
    }

}
exports.afterLog = async function (req, res) {
    //Use for send username and image
    const Memberdata = await Member.findOne({ username: req.user.username })
    res.json({
        username: Memberdata.username,
        ProfilePic: Memberdata.ProfilePic
    })
}
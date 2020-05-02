
var mongoose = require('mongoose')
var formidable = require('formidable')
var bcrypt = require('bcrypt')
var fs = require('fs')
User = mongoose.model('Users')
Member = mongoose.model('Member')

exports.listAllUsers = function (req, res) {
    var query = { sort: { firstName: 1 } }
    User.find({}, null, query, function (err, user) {
        if (err) throw err
        //console.log(user)
        res.json(user)
    })
}

exports.createAUser = async function (req, res) {
    //console.log(req)
    var form = new formidable.IncomingForm({
        uploadDir: process.cwd() + '/tmp',
        keepExtensions: true
    });

    form.parse(req, async (err, fields, files) => {
        console.log(fields)
        if (err) {
            next(err);
            return;
        }
        const CheckUser = await User.findOne({ username: fields.username })
        if (CheckUser) {
            res.sendStatus(403).json({ err: "user already exist" })
        } else {

            //get type of file for rename

            const salt = await bcrypt.genSalt()
            const hashedPassword = await bcrypt.hash(fields.password, salt)

            let type = files.ProfilePic.type
            let useForRename = type.split("/")
            //change type of old path to string
            let oldPath = files.ProfilePic.path
            //rename image file
            fs.rename(oldPath, "../client/public/profileimg/" + fields.username + "_image" + "." + useForRename[1], (err, status) => {
                if (err) throw err
            })
            //generate paymentID
            let memberID = ''
            let count = await User.countDocuments()
            if (count == 0) {
                memberID = 'M0001'
            } else {
                count += 1
                myID = '' + count
                while (myID.length < 4) {
                    myID = '0' + myID
                }
                memberID = 'M' + myID
            }

            let userdata = {
                username: fields.username,
                password: hashedPassword,
                memberID: memberID
            };
            await User.create(userdata)

            let memberdata = {
                username: fields.username,
                firstname: fields.firstname,
                last: fields.lastname,
                DoB: fields.DoB,
                gender: fields.gender,
                address: fields.address,
                email: fields.email,
                tel: fields.tel,
                ProfilePic: 'profileimg/' + fields.username + "_image" + "." + useForRename[1]
            };
            await Member.create(memberdata)
        }
    });


}

exports.readAUser = function (req, res) {
    //console.log(req.params.userId)
    User.findById(req.user.username, function (err, user) {
        if (err) throw err
        res.json(user)
    })
}

exports.deleteAUser = function (req, res) {
    //console.log(req.params.userId)
    User.findOneAndRemove(req.user.username, function (err, user) {
        if (err) throw err
        const response = {
            message: "Delete user id: " + req.user.username + " successfully",
            id: user.username
        }
        res.json(response)
    })
}

exports.updateAUser = function (req, res) {
    //console.log(req.params.userId)
    var newUser = {}
    newUser = req.body
    console.log(newUser)
    User.findOneAndUpdate({ username: req.user.username }, newUser, { new: true }, function (err, user) {
        if (err) throw err
        console.log(user)
        res.json(user)
    })
}
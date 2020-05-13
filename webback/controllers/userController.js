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
        //console.log(fields)
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
            let tempPath = files.ProfilePic.path
            let newPath = "../webfront/public/profileimg/" + fields.username + "_image" + "." + useForRename[1]
            //rename image file
            fs.rename(tempPath, newPath, (err, status) => {
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
                lastname: fields.lastname,
                DoB: fields.DoB,
                gender: fields.gender,
                address: fields.address,
                email: fields.email,
                tel: fields.tel,
                ProfilePic: '/profileimg/' + fields.username + "_image" + "." + useForRename[1]
            };
            //console.log(memberdata)
            await Member.create(memberdata)
        }
    });


}

exports.readAUser = async function (req, res) {
    //console.log(req)
    const Memberdata = await Member.findOne({ username: req.user.username })
    console.log(Memberdata)
    res.json({
        username: Memberdata.username,
        firstname: Memberdata.firstname,
        lastname: Memberdata.lastname,
        DoB: Memberdata.DoB,
        gender: Memberdata.gender,
        address: Memberdata.address,
        email: Memberdata.email,
        tel: Memberdata.tel,
        ProfilePic: Memberdata.ProfilePic
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

exports.updateAUser = async function (req, res) {
    //console.log(req.params.userId)
    var form = new formidable.IncomingForm({
        uploadDir: process.cwd() + '/tmp',
        keepExtensions: true
    });
    form.parse(req, async (err, fields, files) => {
        if (err) {
            next(err);
            return;
        }
        //console.log(fields);
        const CheckUser = await User.findOne({ username: req.user.username })
        const CheckMember = await Member.findOne({ username: req.user.username })
        if (CheckUser && CheckMember) {
            if (await bcrypt.compare(fields.oldpassword, CheckUser.password)) {

                let oldtype = CheckMember.ProfilePic
                let getOldType = oldtype.split(".")
                let oldPath = "../webfront/public/profileimg/" + fields.username + "_image" + "." + getOldType[1]
                fs.unlink(oldPath, (err) => {
                    if (err) {
                        console.error(err)
                        return
                    }
                })

                let type = files.ProfilePic.type
                let useForRename = type.split("/")
                //change type of old path to string
                let tempPath = files.ProfilePic.path
                let newPath = "../webfront/public/profileimg/" + fields.username + "_image" + "." + useForRename[1]
                //rename image file
                fs.rename(tempPath, newPath, (err, status) => {
                    if (err) throw err
                })


                const salt = await bcrypt.genSalt()
                const hashedPassword = await bcrypt.hash(fields.newpassword, salt)

                let userdata = {
                    username: fields.username,
                    password: hashedPassword,
                    //memberID: memberID
                };
                User.findOneAndUpdate({ username: req.user.username }, userdata, { new: true }, (err, user) => {
                    if (err) throw err
                    console.log(user)
                })
                let memberdata = {
                    username: fields.username,
                    firstname: fields.firstname,
                    lastname: fields.lastname,
                    DoB: fields.DoB,
                    gender: fields.gender,
                    address: fields.address,
                    email: fields.email,
                    tel: fields.tel,
                    ProfilePic: '/profileimg/' + fields.username + "_image" + "." + useForRename[1]
                };
                Member.findOneAndUpdate({ username: req.user.username }, memberdata, { new: true }, (err, user) => {
                    if (err) throw err
                    console.log(user)
                })


            }
            else {
                res.json({ err: "password incorrect" })
                let bin = files.ProfilePic.path
                fs.unlink(bin, (err) => {
                    if (err) {
                        console.error(err)
                        return
                    }
                })
            }
        } else {
            res.sendStatus(500)
        }
    })




    //var newUser = {}
    //newUser = req.body
    //console.log(newUser)
    /* User.findOneAndUpdate({ username: req.user.username }, newUser, { new: true }, function (err, user) {
        if (err) throw err
        console.log(user)
        res.json(user)
    }) */
}
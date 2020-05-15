var mongoose = require('mongoose')
var formidable = require('formidable') //user for form-data
var bcrypt = require('bcrypt') // for hash password into database
var fs = require('fs') // for read, copy and delete file
User = mongoose.model('Users')
Member = mongoose.model('Member')

exports.listAllUsers = function (req, res) {
    var query = { sort: { firstName: 1 } }
    User.find({}, null, query, function (err, user) {
        if (err) throw err
        res.json(user)
    })
}

exports.createAUser = async function (req, res) {
    //initialize form upload folder
    var form = new formidable.IncomingForm({
        uploadDir: process.cwd() + '/tmp',
        keepExtensions: true
    });
    //Parse form into files and fields
    form.parse(req, async (err, fields, files) => {
        if (err) {
            next(err);
            return;
        }
        //Check username exist 
        const CheckUser = await User.findOne({ username: fields.username })
        if (CheckUser) { //If exist send error back to front
            res.sendStatus(403).json({ err: "user already exist" })
        } else {
            //generate salt
            const salt = await bcrypt.genSalt()
            //hash password after attach salt into password
            const hashedPassword = await bcrypt.hash(fields.password, salt)
            
            let useForRename = []
            //if user didn't choose ProfilePicture
            if (files.ProfilePic === undefined) {

                let type = 'image/jpeg'
                let tempPath = process.cwd() + '/tmp/default.jpg'
                useForRename = type.split("/")
                let newPath = "../webfront/public/profileimg/" + fields.username + "_image" + "." + useForRename[1]
                fs.copyFile(tempPath, newPath, (err, status) => {
                    if (err) throw err
                })
            }
            //if user choose ProfilePicture
            else {           
                let type = files.ProfilePic.type
                useForRename = type.split("/")
                //Change type of old path to string
                let tempPath = files.ProfilePic.path
                let newPath = "../webfront/public/profileimg/" + fields.username + "_image" + "." + useForRename[1]
                //Rename image file
                fs.rename(tempPath, newPath, (err, status) => {
                    if (err) throw err
                })
            }
            
            //Generate paymentID
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
            //Create userdata Object
            let userdata = {
                username: fields.username,
                password: hashedPassword,
                memberID: memberID
            };
            await User.create(userdata) //Create userdata into database
            //Create memberdata Object
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
            await Member.create(memberdata) //Create memberdata into database
        }
    });


}

exports.readAUser = async function (req, res) {
    //Find User by using username
    const Memberdata = await Member.findOne({ username: req.user.username })
    //Send all information back
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
    //initialize form upload folder 
    var form = new formidable.IncomingForm({
        uploadDir: process.cwd() + '/tmp',
        keepExtensions: true
    });
    //Parse form into files and fields
    form.parse(req, async (err, fields, files) => {
        if (err) {
            next(err);
            return;
        }
        //Find Userdata by using username
        const CheckUser = await User.findOne({ username: req.user.username })
        //Find Memberdata by using username
        const CheckMember = await Member.findOne({ username: req.user.username })
        //if both exists
        if (CheckUser && CheckMember) {
            //Check Old password is match or not
            if (await bcrypt.compare(fields.oldpassword, CheckUser.password)) {
                //if Match
                let useForRename = []
                //if User didn't change ProfilePicture
                if (files.ProfilePic == undefined) {
                    useForRename = CheckMember.ProfilePic.split(".")
                }
                //if User change ProfilePicture
                else {
                    let oldtype = CheckMember.ProfilePic
                    let getOldType = oldtype.split(".")
                    let oldPath = "../webfront/public/profileimg/" + fields.username + "_image" + "." + getOldType[1]
                    //Delete Old picture image
                    fs.unlink(oldPath, (err) => {
                        if (err) {
                        console.error(err)
                        return
                        }
                    })

                    let type = files.ProfilePic.type
                    useForRename = type.split("/")
                    //Change type of old path to string
                    let tempPath = files.ProfilePic.path
                    let newPath = "../webfront/public/profileimg/" + fields.username + "_image" + "." + useForRename[1]
                    //Rename image file
                    fs.rename(tempPath, newPath, (err, status) => {
                       if (err) throw err
                    })
                }
                const salt = await bcrypt.genSalt()
                const hashedPassword = await bcrypt.hash(fields.newpassword, salt)

                let userdata = {
                    username: fields.username,
                    password: hashedPassword,
                };
                //Update Userdata
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
                //Update Memberdata
                Member.findOneAndUpdate({ username: req.user.username }, memberdata, { new: true }, (err, user) => {
                    if (err) throw err
                    console.log(user)
                })
                res.json({ data: "password correct"})

            }
            //if Password didn't match
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
        //if anything goes wrong..  
        } else {
            res.sendStatus(500)
        }
    })
}
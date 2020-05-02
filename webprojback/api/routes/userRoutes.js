require('dotenv').config()

var jwt = require('jsonwebtoken')

module.exports = function (app) {
    var user = require('../controllers/userController')
    app.route('/users')
        .get(user.listAllUsers)
        .post(user.createAUser)

    app.route('/auser')
        .get(authenticateToken, user.readAUser)
        .delete(authenticateToken, user.deleteAUser)
        .post(authenticateToken, user.updateAUser)
}

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401)

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        console.log(err)
        if (err) return res.sendStatus(403)
        req.user = user
        next()
    })
}
require('dotenv').config()
var jwt = require('jsonwebtoken')

//All route here
module.exports = function(app){
    var payment = require('../controllers/paymentController')
    var book = require('../controllers/bookController')
    var bookHistory = require('../controllers/bookingHistoryController')
    var roomDetail = require('../controllers/roomDetailController')
    var user = require('../controllers/userController')
    app.route('/users')
        .get(user.listAllUsers)
        .post(user.createAUser)
        
    app.route('/auser')
        .get(authenticateToken, user.readAUser)
        .delete(authenticateToken, user.deleteAUser)
        .post(authenticateToken, user.updateAUser)

    app.route('/payment')
        .post(authenticateToken, payment.getInformation)
        .get(authenticateToken, payment.frontInformation)

    app.route('/book')
        .post(authenticateToken,book.sendBooking)
        .put(authenticateToken,book.initPage)

    app.route('/bookhistory')
        .get(authenticateToken, bookHistory.getAll)

    app.route('/roomdetail/:type')
        .get(roomDetail.getPrice)
        .post(roomDetail.getRoom)

}

//Use for authenticate Each route
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401)

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403)
        req.user = user
        next()
    })
}
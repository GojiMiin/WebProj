require('dotenv').config()
var jwt = require('jsonwebtoken')

module.exports = function(app){
    var payment = require('../controllers/paymentController')
    var book = require('../controllers/bookController')
    var bookHistory = require('../controllers/bookingHistoryController')
    var roomDetail = require('../controllers/roomDetailController')
    var PaymentInfo = require('../controllers/adminPaymentController')
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
        .post(authenticateToken, book.sendBooking)
        .get(authenticateToken, book.initPage)

    app.route('/bookhistory')
        .get(authenticateToken, bookHistory.getAll)
        .delete(authenticateToken, bookHistory.cancel)

    app.route('/roomDetail/:type')
        .get(roomDetail.getPrice)

    app.route('/PaymentInfo')
        .get(authenticateToken, PaymentInfo.getAllPayment)
        .put(authenticateToken, PaymentInfo.updateStatus)
}

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401)

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        //console.log(err)
        if (err) return res.sendStatus(403)
        req.user = user
        next()
    })
}
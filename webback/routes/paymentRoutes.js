module.exports = function(app){
    var payment = require('../controllers/paymentController')
    var book = require('../controllers/bookController')
    app.route('/Payment/:username')
        .post(payment.getInformation)
        .get(payment.frontInformation)
    app.route('/book/:username')
        .post(book.sendBooking)
        .get(book.initPage)
}
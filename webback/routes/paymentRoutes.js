module.exports = function(app){
    var payment = require('../controllers/paymentController')
    var book = require('../controllers/bookController')
    var bookHistory = require('../controllers/bookingHistoryController')
    app.route('/Payment/:username')
        .post(payment.getInformation)
        .get(payment.frontInformation)
    app.route('/book/:username')
        .post(book.sendBooking)
        .get(book.initPage)
    app.route('/bookhistory/:username')
        .get(bookHistory.getAll)
        .delete(bookHistory.cancel)
}
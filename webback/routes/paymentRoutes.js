module.exports = function(app){
    var payment = require('../controllers/paymentController')
    app.route('/Payment')
        .post(payment.getInformation)
        .get(payment.hi)
}
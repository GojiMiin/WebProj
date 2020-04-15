module.exports = function(app){
    var payment = require('../controllers/paymentController')
    app.route('/Payment/:username')
        .post(payment.getInformation)
        .get(payment.frontInformation)
}
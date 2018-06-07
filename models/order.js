let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let orderSchema = Schema({
    _id: Schema.Types.ObjectId,
    orderDate: {
        type: Date,
        default: Date.now
    },
    packages: Array
});

module.exports = mongoose.model('Order', orderSchema);
let mongoose = require('../config/mongoose');

let {Order} = require('../models');

module.exports = {
    saveOrder: (packages) => {
        return Order.create({
            _id: new mongoose.Types.ObjectId(),
            packages
        });
    }
};
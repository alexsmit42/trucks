let express = require('express');
let path = require('path');

let apiRouter = express.Router();
let {api, validator, db} = require('../utils');
let logger = require('../config/logger');

function responseError(res, err) {
    logger.error(JSON.stringify(err));
    res.status(500).json({
        msg: err.msg
    });
}

apiRouter.post('/order', (req, res) => {
    let packages = req.body;

    if (!packages || !packages.length) {
        responseError(res, {
            request: packages,
            msg: 'Incorrect format of request'
        });
        return;
    }

    let errors = validator.validatePackages(packages);
    if (errors.length) {
        responseError(res, {
            request: packages,
            msg: errors
        });
        return;
    }

    db.saveOrder(packages);

    let order = api.createOrder(packages);

    res.status(200).json(order);
});

apiRouter.get('/price', (req, res) => {
    let file = path.join(__dirname, '../public/price.pdf');
    res.download(file);
});

module.exports = apiRouter;
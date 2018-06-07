let mongoose = require('mongoose');
let logger = require('./logger');
let config = require('config');

mongoose.Promise = global.Promise;
mongoose.connect(`${config.get('mongo.host')}/${config.get('mongo.db')}`).catch(err => {
    logger.error(err)
});

module.exports = mongoose;
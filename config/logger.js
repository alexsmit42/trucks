let path = require('path');
const {createLogger, format, transports} = require('winston');
const {combine, printf} = format;

const myFormat = printf(info => {
    const date = new Date();

    return `${date} [${info.level}]: ${info.message}`;
});

const logger = createLogger({
    format: combine(
        myFormat
    ),
    transports: [
        new transports.File({filename: path.join(__dirname, '../logs/error.log'), level: 'error'})
    ]
});

module.exports = logger;
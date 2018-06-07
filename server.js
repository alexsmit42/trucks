let express = require('express');
let app = express();
let helmet = require('helmet');
let bodyParser = require('body-parser');

let apiRouter = require('./routes/api');
let logger = require('./config/logger');

app.use(helmet());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/public', express.static(__dirname + '/public'));

app.disable('x-powered-by');

app.use('/api', apiRouter);

app.use(function (err, req, res, next) {
    logger.error(JSON.stringify(err));
    res.status(500).send('Something wrong...');
});

app.listen(process.env.PORT || 3000, () => {
    console.log('Server is running...');
});
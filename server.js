var express = require('express');
var React = require('react');
var path = require('path');
var LapCounter = React.createFactory(require('./build/app.js'));
var Tutorial = React.createFactory(require('./build/tutorial.js'));
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// Allow access to files in 'public' directory
app.use(express.static('public'));

// ROUTES
app.get('/', function (req, res) {
	res.render('index');
	console.log('GET /');
});

app.get('/app', function (req, res) {
	res.render('app', {app: React.renderToString(LapCounter({}))});
	console.log('GET /app');
});

app.get('/tutorial', function (req, res) {
	res.render('app', {app: React.renderToString(Tutorial({}))});
	console.log('GET /tutorial');
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

app.set('port', process.env.OPENSHIFT_NODEJS_PORT || 8080);
app.set('ip_address', process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1');

var server = app.listen(app.get('port'),app.get('ip_address'), function() {
  console.log('Express server listening on ' + server.address().port + ', ' + server.address().address);
});

module.exports = app;
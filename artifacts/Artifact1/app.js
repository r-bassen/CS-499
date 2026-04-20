var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./app_server/routes/index');
var usersRouter = require('./app_server/routes/users');
var travelRouter = require('./app_server/routes/travel');
var apiRouter = require('./app_api/routes/index');

var handlebars = require('hbs');

// Bring in the database
require('./app_api/models/db');
const checkoutRouter = require('./app_server/routes/checkout');

// wire in our authentication module
var passport = require('passport'); 
require('./app_api/config/passport');

// serve-favicon module
var favicon = require('serve-favicon');

// bring in dotenv and load the .env file
require('dotenv').config();

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'app_server', 'views'));


// register handlebars partials (https://www.npmjs.com/package/hbs)
handlebars.registerPartials(path.join(__dirname + '/app_server/views/partials'));

app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));

// Enable CORS
app.use('/api', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');       // EDIT: Added DELETE method
    next();
});

// Test route to fetch trips from API and render travel view
app.get('/traveltest', async (req, res) => {
    //console.log('TRAVELTEST ROUTE HIT');

    try {

        // Fetch trips from the API
        const response = await fetch('http://localhost:3000/api/trips');
        const json = await response.json();

        // console.log('Got trips:', json.length);
        // Render the travel view with fetched trips
        res.render('travel', {
            title: 'Travlr Getaways',
            trips: json,
            message: null
        });

        // console.log('Rendered travel view');
    } catch (err) {
        console.error('Error:', err);
        res.send('Error: ' + err.message);
    }
});


// wire up routes to controllers
app.use('/', indexRouter);
app.use('/api/users', usersRouter);
app.use('/travel', travelRouter);
app.use('/checkout', checkoutRouter);
app.use('/api', apiRouter);

console.log('Travel router registered at /travel');


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// catch unauthorized errors
app.use((err, req, res, next) => {
    // set locals, only providing error in development
    if (err.name === 'UnauthorizedError') {
        res
            .status(401)
            .json({ "message": err.name + ": " + err.message });
    }
    else {
        next(err);
    }
});


// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');

});

module.exports = app;

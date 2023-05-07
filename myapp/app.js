var createError = require('http-errors');
var cookieParser = require('cookie-parser');
var path = require('path');
var logger = require('morgan');
var express = require('express');
var session = require('express-session');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var offreRouter = require('./routes/job_offer');
var loginRouter = require('./routes/login');
var EntrepriseRouter = require('./routes/entreprise');
var OffreRouter = require('./routes/offre');

// app.use(express.static('public'));

var app = express();

// CSS
app.use("/CSS", express.static(__dirname + "/CSS/"));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    secret: 'Je suis un secret',
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 } // 1h
}));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/job_offer', offreRouter);
app.use('/login', loginRouter);
app.use('/entreprise', EntrepriseRouter);
app.use('/offre', OffreRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
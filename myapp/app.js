var createError = require('http-errors');
var cookieParser = require('cookie-parser');
var path = require('path');
var logger = require('morgan');
var express = require('express');
var session = require('express-session');
var cors = require('cors');
var multer = require('multer');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var offreRouter = require('./routes/job_offer');
var loginRouter = require('./routes/login');
var EntrepriseRouter = require('./routes/entreprise');
var OffreRouter = require('./routes/offre');
var apiRouter = require('./routes/api');
var adminRouter = require('./routes/admin');
var candidatureRouter = require('./routes/candidature');

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
app.use(cors( {
    origin: 'http://localhost:3000',
    credentials: true
}));

app.use(session({
    secret: 'Ca cest pas grave ca cest bien, je suis un secret',
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
app.use('/api', apiRouter);
app.use('/admin', adminRouter);
app.use('/candidature', candidatureRouter);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});


// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    console.log(err);
    if (res.status(404)) {
        if (req.session.loggedin) {
            res.render('404', {
                title: "404",
                username: req.session.username,
                type_user: req.session.type_user
            });
        } else {
            res.render('404', {
                title: "404"
            });
        }
    } else {
        res.locals.message = err.message;
        res.locals.error = req.app.get('env') === 'development' ? err : {};

        // render the error page
        res.status(err.status || 500);
        if (req.session.loggedin) {
            res.render('error', {
                title: "Erreur",
                username: req.session.username,
                type_user: req.session.type_user
            });
        } else {
            res.render('error', {
                title: "Erreur"
            });
        }
    }
});


module.exports = app;
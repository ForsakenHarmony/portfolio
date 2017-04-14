'use strict';

const express    = require('express');
const path       = require('path');
const favicon    = require('serve-favicon');
const logger     = require('morgan');
const bodyParser = require('body-parser');
const helmet     = require('helmet');
const compress   = require('compression');
const cors       = require('cors');

const app = express();

app.enable('trust proxy');

const contentSecurityPolicy = app.get('env') === 'development' ? false
  : {
    directives: {
      defaultSrc: ['\'self\''],
      styleSrc  : ['\'self\'', 'fonts.googleapis.com', 'fonts.gstatic.com'],
      imgSrc    : ['\'self\'', 'twitter.com', 'mobile.twitter.com', 'pbs.twimg.com'],
    },
  };

// Enable CORS, security, compression, favicon and body parsing
app.use(cors());
app.use(helmet({
  contentSecurityPolicy,
  referrerPolicy: true,
}));
app.use(compress());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// view engine setup
app.set('views', path.resolve(__dirname, 'views'));
app.set('view engine', 'pug');

if (app.get('env') === 'development') {
  require('./webpack')(app);
}

app.use(favicon(path.join(__dirname, '..', 'public', 'favicon.png')));
app.use('/assets', express.static(path.resolve(__dirname, '..', 'public')));

app.use('/', (req, res, next) => {
  if (!req.accepts('html') || req.url.includes('/assets')) {
    return next();
  }
  res.render('index', { title: '~ harmony ~' });
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err  = new Error('Not Found');
  err.status = 404;
  next(err);
});

const HTTPStatus = require('http-status');
// error handler
app.use((err, req, res, next) => {
  if (typeof err === 'number') {
    const status = err;
    err          = new Error(HTTPStatus[err]);
    err.status   = status;
  }
  
  // render the error page
  res.status(err.status || 500);
  
  // set locals, only providing error in development
  const message = res.locals.message = err.message || (res.statusCode === 404 ? 'Not Found' : 'Error');
  
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  
  if (req.xhr) {
    res.json({ msg: message });
  } else {
    switch (req.accepts(['text', 'json'])) {
      case 'json': {
        res.json({ msg: message });
        break;
      }
      case 'text':
      default: {
        res.render('error');
      }
    }
  }
  
  next();
});

module.exports = app;

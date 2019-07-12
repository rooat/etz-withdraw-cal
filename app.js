var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var logMaster = require('log-master');

var views = require('./routes/views');
var api = require('./routes/api');

var app = express();

app.use(session({
	// Here we are creating a unique session identifier
	secret: 'secret123',
	resave: true,
	saveUninitialized: true
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public

//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', views);
app.use('/api', api);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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

app.use(session({
    secret :  'secret', // 对session id 相关的cookie 进行签名
    resave : true,
    saveUninitialized: false, // 是否保存未初始化的会话
    cookie : {
        maxAge : 1000 * 3110400, // 设置 session 的有效时间，单位毫秒
    },
}));


logMaster.split({ //切割，目前唯一的功能
  "from": { //源文件夹，可多选。
    "app": "./"
  },
  "Suffix": [".log"], //要切割的文件类型，可多选。默认 [".log"]
  "to": "./splitLog", //目标文件夹,log都会到这里。
  "Interval": 1000 * 10* 60 * 24 , //切割时间间隔，默认一天。
  "timeFormat": "yyyy年MM月dd日HH时mm分ss秒", //时间格式(生成的文件夹名),默认为yyyy年MM月dd日HH时mm分ss秒
  "startTime": "23:59" //开始时间，默认零点,精确到秒的话就："00:00:00"
});

module.exports = app;

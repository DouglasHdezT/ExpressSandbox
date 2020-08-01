var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var apiRouter = require('./routes/api');

//Aqui empieza lo bueno
var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => { 
	req.headers.message = "He modificado la request desde aqui, annonymus llévame!"; 
	const { authorization } = req.headers;

	if (!authorization) { 
		return res.status(403).json({
			msg: "Esta es zona prohibida!"
		});
	}

	next();
})

app.use('/api', apiRouter);

module.exports = app;
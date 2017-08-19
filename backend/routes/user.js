var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var hat = require('hat');
var bcrypt = require('bcryptjs');
var request = require('request');
var User = require('../models/user');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));


function uniR(res, status, msg) {
	res.json({
		status: status,
		msg: msg
	})
}


app.get('/', function (req, res) {
	res.json('routes');
})

app.post('/register', function (req, res) {
	if (req.body.email && req.body.password) {
		User.findOne({
				email: req.body.email
			})
			.then(function (users) {
				if (!users) {
					bcrypt.hash(req.body.password, 10, function (err, hash) {
						var user = new User();
						user.email = req.body.email;
						user.password = hash;
						user.save();
						uniR(res, true, 'User registered successfully !!')
					})
				} else {
					uniR(res, false, 'User already registered !!')
				}
			})
			.catch(function (err) {
				console.log(err);
				uniR(res, false, 'Error when querying !!')
			})
	} else {
		uniR(res, false, 'Invalid entries !!')
	}
})

app.post('/login', function (req, res) {
	if (req.body.email && req.body.password) {
		User.findOne({
				email: req.body.email
			})
			.then(function (user) {
				if (user) {
					bcrypt.compare(req.body.password, user.password, function (err, resp) {
						if (resp == true) {
							user.authKey = hat();
							user.save();
							res.json({
								status: true,
								authKey: user.authKey
							})
						} else {
							uniR(res, false, 'Password is wrong !!')
						}
					})
				} else {
					uniR(res, false, 'User not found !!')
				}
			})
			.catch(function (err) {
				console.log(err);
				uniR(res, false, 'Error when querying !!')
			})
	} else {
		uniR(res, false, 'Invalid entries !!')
	}
})


module.exports = app;

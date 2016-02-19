var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var mongoose =require('mongoose');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static('public'));

app.set('view engine', 'ejs');
app.get('/', function(req, res) {
	res.render('index', {title: 'show this ugly title object'});
});

var port = process.env.PORT || 8080;

var router = express.Router();

router.use(function(req, res, next) {
	console.log("something is happening")
	next();
});

router.get('/', function(req, res) {
	res.json({ message: 'hooray! welcome to our api!'});
});


app.listen(port);
console.log('👹 👹 👹 👹 👹 👹 👹 👹 👹 👹 👹 👹 👹 👹 👹\n💀   Blog is up on port ' + port +' 💀\n👹 👹 👹 👹 👹 👹 👹 👹 👹 👹 👹 👹 👹 👹 👹');
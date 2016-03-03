var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var passport =require('passport');
var mongoose =require('mongoose');
mongoose.connect('mongodb://localhost/blogpost');
var router = express.Router();
var blogPostRouter = require('./routes/blogposts');
var tweetRoutes = require('./routes/tweet');
var BlogPost = require('./models/blogpost');
var flash = require('connect-flash');
var session = require('express-session');

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(function(req, res, next) {
	var user = req.user || "no user";
	console.log(user);
	next();
});

app.use(session({
 secret: 'ilovescotchscotchyscotchscotch'
})); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(session({
 cookie: {
   maxAge: 60000
 }
}));
app.use(flash());

require('./config/passport')(passport);
// routes ======================================================================
require('./routes/user.js')(app, passport);


app.get('/', function(req, res) {
	var user = req.user || "no user";
	res.render('index', {user: user})
});

app.get('/blogposts', function(req, res) {
	var user = req.user || "no user";
	BlogPost.find(function(err, blogPosts){
		if(err){
			console.log(err);
		} else {
			res.render('blogposts', {blogPosts: blogPosts, user: user});
		}
	})
});

app.get('/social', function(req, res) {
	var user = req.user || "no user";
	res.render('social', {user: user});
});

var port = process.env.PORT || 8080;



// router.use(function(req, res, next) {
// 	console.log("something is happening")
// 	next();
// });

router.get('/', function(req, res) {
	res.json({ message: 'hooray! welcome to our api!'});
});

app.use('/api', blogPostRouter);
app.use('/api/tweets', tweetRoutes);
app.listen(port);
console.log('👹 👹 👹 👹 👹 👹 👹 👹 👹 👹 👹 👹 👹 👹 👹\n💀   Blog is up on port ' + port +' 💀\n👹 👹 👹 👹 👹 👹 👹 👹 👹 👹 👹 👹 👹 👹 👹');
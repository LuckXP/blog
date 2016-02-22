var express = require('express');
var router = express.Router();

var BlogPost = require('../models/blogpost');
var blogPost = new BlogPost;

router.route('/blogposts')//post a new blog post
	.post(function(req, res) {
		var blogPost = new BlogPost();

		blogPost.postDate = req.body.postDate;
		blogPost.postBody = req.body.postBody
		blogPost.author = req.body.author;

		blogPost.save(function(err, blogPost){
			if(err){
				console.log(err);
			} else {
				res.json(blogPost)
			}
		})
	})
	.get(function(req, res) {
		BlogPost.find(function(err, blogPosts){
			if(err){
				console.log(err);
			} else {
				res.json(blogPost);
			}
		})
	});

// router.route('/bears/:bear_id')
// 	.get(function(req, res) {
// 		Bear.findById(req.params.bear_id, function(err, bear) {
// 			if(err){
// 				console.log(err);
// 			} else {
// 				res.json(bear);
// 			}
// 		})	
// 	})
// 	.put(function(req, res) {
// 		Bear.findById(req.params.bear_id, function(err, bear) {
// 			if(err){
// 				console.log(err);
// 			} else {
// 				bear.name = req.body.name ? req.body.name : bear.name;
// 				bear.age = req.body.age ? req.body.age : bear.age;
// 				bear.gender = req.body.gender ? req.body.gender : bear.gender;
				
// 				bear.save(function(err){
// 					if(err){
// 						console.log(err);
// 					} else {
// 						res.json({title: "bear updated"});
// 					}
// 				})
// 			}
// 		})	
// 	})
// 	.delete(function(req, res) {
// 		Bear.remove({_id :req.params.bear_id}, function(err, bear) {
// 			if(err){
// 				console.log(err);
// 			} else {
// 				res.json({title: "bear was deleted"});
// 			}
// 		})	
// 	})

module.exports = router;
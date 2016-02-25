var express = require('express');
var router = express.Router();

var BlogPost = require('../models/blogpost');


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
				res.json(blogPosts);
			}
		})
	});

router.route('/blogposts/:blogpost_id')
	.get(function(req, res) {
		BlogPost.findById(req.params.blogpost_id, function(err, blogPost) {
			if(err){
				console.log(err);
			} else {
				res.json(blogPost);
			}
		})	
	})
	.put(function(req, res) {
		BlogPost.findById(req.params.blogpost_id, function(err, blogPost) {
			if(err){
				console.log(err);
			} else {
				
				blogPost.postDate = req.body.postDate ? req.body.postDate : blogPost.postDate;
				blogPost.postBody = req.body.postBody ? req.body.postBody : blogPost.postBody;
				blogPost.author = req.body.author ? req.body.author : blogPost.author;
				
				blogPost.save(function(err){
					if(err){
						console.log(err);
					} else {
						res.json({title: "blogpost updated"});
					}
				})
			}
		})	
	})
	.delete(function(req, res) {
		BlogPost.remove({_id :req.params.blogpost_id}, function(err, blogPost) {
			if(err){
				console.log(err);
			} else {
				console.log(blogPost);
				res.json({title: "blogPost was deleted"});
			}
		})	
	})

module.exports = router;
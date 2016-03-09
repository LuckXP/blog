var express = require('express');
var router = express.Router();
var Comment = require('../models/comment');
var BlogPost = require('../models/blogpost');
var user = require('../models/user');

router.route('/blogposts')//post a new blog post
	.post(function(req, res) {
		var u = req.user || "no userrrrrr";
		console.log(u);
		var blogPost = new BlogPost();


		blogPost.postBody = req.body.postBody;
		blogPost.author = req.user._id || '56d5e47b99a5a32f1b7cf9f8';
		


		blogPost.save(function(err, blogPost){
			if(err){
				console.log(err);
			} else {
				res.json(blogPost)
			}
		})
	})
	.get(function(req, res) {

		BlogPost.find()
		.populate('author')
		.populate('comments')
		.exec(function(err, blogPosts){
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

router.route('/blogposts/:blogpost_id/comment')
	.post(function(req, res){
		var comment = new Comment();
		comment.body = req.body.body ? req.body.body : comment.body;
		comment.user = "56d4b62932bf3f9516a8c301";
		comment.blogPost = req.params.blogpost_id;

		comment.save(function(err, com){
			if(err){
				res.send(err);
			} else {

				BlogPost.findById(req.params.blogpost_id, function(err, blogPost){
					if(err){
						res.send(err);
					} else {
						blogPost.comments.push(com._id);
						blogPost.save();
						res.json(com);
					}   
				})
			}
		})
	})

module.exports = router;


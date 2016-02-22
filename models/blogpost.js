var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BlogPost = new Schema({
	postDate: {
		type: Date,
		// default: Date.now,
		required: true,
	},
	postBody: {
		type: String,
		required: true,
	},
	author: {
		type: String,
		required: true,
	},
})

module.exports = mongoose.model('BlogPost', BlogPost);
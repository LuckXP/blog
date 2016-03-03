var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BlogPost = new Schema({
	postDate: {
		type: Date,
		default: Date.now,
		required: true,
	},
	postBody: {
		type: String,
		required: true,
	},
	author: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
	},
})

module.exports = mongoose.model('BlogPost', BlogPost);
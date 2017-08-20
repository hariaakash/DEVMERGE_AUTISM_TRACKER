var mongoose = require('mongoose');
var Schema = mongoose.Schema;


mongoose.Promise = global.Promise;


var userSchema = new Schema({
	email: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true
	},
	images: [{
		time: {
			type: Date,
			default: Date.now
		},
		url: String,
		emotion: [Number],
		final: Number,
		label: Number
	}],
	authKey: String
});


module.exports = mongoose.model('User', userSchema);

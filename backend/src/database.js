const mongoose = require('mongoose');
const { Schema } = mongoose;

mongoose.connect('mongodb://localhost/web-navigation', { family: 4 });

const userSchema = new Schema({
	username: String,
	password: String,
	firstname: String,
	lastname: String,
	email: String,
});

const siteSchema = new Schema({
	name: String,
	season: String,
	district: String,
	difficulty: Number,
	distance: Number,
	duration: Number,
});

module.exports = mongoose.model('User', userSchema);
module.exports = mongoose.model('Site', siteSchema);

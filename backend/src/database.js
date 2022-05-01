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
	userid: String,
	name: String,
	season: Number,
	district: Number,
	difficulty: Number,
	distance: Number,
	duration: Number,
});

const User = mongoose.model('User', userSchema);
const Site = mongoose.model('Site', siteSchema);

module.exports = {
	User,
	Site,
};

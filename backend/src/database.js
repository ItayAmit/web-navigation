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
	type: Number,
	description: String,
	location: { lat: Number, lng: Number },
});

const rateSchema = new Schema({
	userid: String,
	siteid: String,
	rating: Number,
	comment: String,
});

const tripSchema = new Schema({
	userid: String,
	date: String,
	origin: { type: [Number] },
	destination: { type: [Number] },
});

const searchSchema = new Schema({
	userid: String,
	season: Number,
	district: Number,
	difficulty: Number,
	distance: Number,
	duration: Number,
	type: Number,
	date: Number,
});

const districtSchema = new Schema({
	key: Number,
	name: String,
	north: Number,
	east: Number,
	south: Number,
	west: Number,
});

const seasonSchema = new Schema({
	key: Number,
	name: String,
});

const difficultySchema = new Schema({
	key: Number,
	name: String,
});

const distanceSchema = new Schema({
	key: Number,
	name: String,
});

const durationSchema = new Schema({
	key: Number,
	name: String,
});

const typeSchema = new Schema({
	key: Number,
	name: String,
});

const User = mongoose.model('User', userSchema);
const Site = mongoose.model('Site', siteSchema);
const Search = mongoose.model('Search', searchSchema);
const District = mongoose.model('District', districtSchema);
const Season = mongoose.model('Season', seasonSchema);
const Difficulty = mongoose.model('Difficulty', difficultySchema);
const Distance = mongoose.model('Distance', distanceSchema);
const Duration = mongoose.model('Duration', durationSchema);
const Type = mongoose.model('Type', typeSchema);
const Rate = mongoose.model('Rate', rateSchema);

module.exports = {
	User,
	Site,
	Search,
	District,
	Season,
	Difficulty,
	Distance,
	Duration,
	Type,
	Rate,
};

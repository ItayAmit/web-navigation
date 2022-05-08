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
	difficulty: Number,
	distance: Number,
	duration: Number,
	description: String,
});

const tripSchema = new Schema({
	userid: String,
	date: String,
	origin: { type: [Number], required: true },
	destination: { type: [Number], required: true },
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
const District = mongoose.model('District', districtSchema);
const Season = mongoose.model('Season', seasonSchema);
const Difficulty = mongoose.model('Difficulty', difficultySchema);
const Distance = mongoose.model('Distance', distanceSchema);
const Duration = mongoose.model('Duration', durationSchema);
const Type = mongoose.model('Type', typeSchema);

module.exports = {
	User,
	Site,
	District,
	Season,
	Difficulty,
	Distance,
	Duration,
	Type,
};

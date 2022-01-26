const mongoose = require('mongoose');
const { Schema } = mongoose;

mongoose.connect('mongodb://localhost/web-navigation', { family: 4 });

const userSchema = new Schema({
    username: String,
    password: String,
});

module.exports = mongoose.model('User', userSchema);

const mongoose = require('mongoose');
const { Schema } = mongoose;

mongoose.connect('mongodb://127.0.0.1/web-navigation');

const userSchema = new Schema({
    username: String,
    password: String,
});

module.exports = mongoose.model('User', userSchema);

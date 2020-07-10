const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    alias: String,
})

module.exports = mongoose.model('User', UserSchema);
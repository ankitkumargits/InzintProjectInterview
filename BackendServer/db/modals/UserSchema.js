const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    image: String,
    name: String,
    email: String,
    phone: Number,
    quote: String,
});

const User = mongoose.model('User', userSchema)

module.exports = User;
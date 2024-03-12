const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String
    },
    mobileNo: {
        type: String
    }
})

const User = mongoose.model('user', UserSchema);

module.exports = User
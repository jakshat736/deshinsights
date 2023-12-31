const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    userid: {
        type: String,
    },
    username:{
        type: String,
        required: true
    },
    emailid:{
        type: String,
        required: true
    },
    mobileno:{
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('User', userSchema);

const mongoose = require('mongoose');
const {isEmail} = require('validator')
const bcrypt = require('bcrypt')

const UserSchema = mongoose.Schema({
    email: {
        type: String,
        required: [true, 'please enter email'],
        unique: true,
        lowercase: true,
        validate: [isEmail, 'Please enter a valid email'] 
    },
    password: {
        type: String,
        required: [true, 'Please enter password'],
        minlength: [6, 'Minimum password length is 6 characters'],
    }
})


// hashing the password with bcrypt
UserSchema.pre('save', async function (next) {
    this.password = await bcrypt.hash(this.password, 8);
    next();
})


const User = mongoose.model('user', UserSchema);

module.exports = User;
const mongoose = require('mongoose');

const entitySchema = new mongoose.Schema({
    name: { type: String, required: true },
    mail: { type: String, required: true},
    password: { type: String, required: true},
    birthdate: { type: String, required: true},
    phone: { type: Number, required: true },
    address: { type: String, required: true},
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', entitySchema);
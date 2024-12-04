const mongoose = require('mongoose');

const parkingSchema = new mongoose.Schema({
    lot: String,
    available: Number,
    capacity: Number,
    percentage: String,
});

module.exports = mongoose.model('Parking', parkingSchema);
const mongoose = require('mongoose');
const { Schema } = mongoose;

const Cafeteria = Schema({
    CafeId: String,
    Soda: String,
});

mongoose.model('Cafeteria', Cafeteria);
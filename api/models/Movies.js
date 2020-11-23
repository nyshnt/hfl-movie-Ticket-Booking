const mongoose = require('mongoose');
const { Schema } = mongoose;

const Movies = Schema({
    MovieId: String,
    MovieName: String,
    NumberOfShows: String,
    Schedule: String,
    Auditorium: String,
    Price: String,
    TotalSeats: String
});

mongoose.model('Movies', Movies);
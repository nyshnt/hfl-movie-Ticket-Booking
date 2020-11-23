const mongoose = require('mongoose');
const { Schema } = mongoose;

const Tickets = Schema({
    TicketId: String,
    MovieId: String,
    MovieName: String,
    Schedule: String,
    Auditorium: String,
    Seats: String,
    TotalAmount: String,
    Water: String,
    Popcorn: String,
    Soda: String,
});

mongoose.model('Tickets', Tickets);
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

// Parse application/json type post data
app.use(bodyParser.json());

// Parse application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({
    extended: false
}))

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    // Pass to next layer of middleware
    next();
});

mongoose.connect("mongodb://127.0.0.1:27017/movieBooking", { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
    .then(() => {
        // console.log("mongodb connected successfully");
    })
    .catch(err => {
        console.log(err);
    })

require('./models/Tickets')
require('./models/Movies')
require('./models/Cafeteria')

app.use(require('./routes'))

var started = new Date();

app.get('/', (req, res) => {
    res.send({
        started: "Started at :" + started,
        uptime: (Date.now() - Number(started)) / 1000,
    });
})


app.listen(4000, () => { console.log("Server is listening on port 4000!") })
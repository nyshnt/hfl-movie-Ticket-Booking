const mongoose = require('mongoose');
const router = require('express').Router();
const invoke = require('../../app/invoke')
const query = require('../../app/query')
const errMsg = require('../../utils/errMsg')

const Movies = mongoose.model('Movies')

// Add new Movie
router.post('/addNewMovie', async (req, res) => {

    var contractName = req.body.contractName;
    var channelName = req.body.channelName;
    var methodName = req.body.methodName;
    var userName = req.body.userName;
    var args = req.body.args;

    if (!contractName) {
        res.json(errMsg('\'contractName\''));
        return;
    }
    if (!channelName) {
        res.json(errMsg('\'channelName\''));
        return;
    }
    if (!methodName) {
        res.json(errMsg('\'methodName\''));
        return;
    }
    if (!userName) {
        res.json(errMsg('\'userName\''));
        return;
    }
    if (!args) {
        res.json(errMsg('\'args\''));
        return;
    }

    var Movie = new Movies()

    Movie.MovieId = args[0]
    Movie.MovieName = args[1]
    Movie.NumberOfShows = args[2],
        Movie.Schedule = args[3],
        Movie.Auditorium = args[4],
        Movie.Price = args[5],
        Movie.TotalSeats = args[6]

    var response = await invoke.invoke(contractName, channelName, methodName, userName, args)
    if (response) {
        Movie.save((err, inserted) => {
            if (err) {
                return res.json({
                    'success': false,
                    'data': null,
                    'message': 'Internal server error'
                });
            } else {
                res.send(response)
            }
        })
    }
})

router.get('/listAllMovies', async (req, res) => {
    Movies.find((err, movies) => {
        if (err) {
            return res.json({
                'success': false,
                'data': null,
                'message': 'Internal server error'
            });
        } else {
            if (movies.length == 0) {
                return res.json({
                    'success': false,
                    'data': null,
                    'message': 'Internal server error'
                })
            } else {
                return res.json({
                    'success': true,
                    'data': movies,
                    'message': "movies list"
                });
            }
        }
    })
})

router.post('/queryMovieDetail', async (req, res) => {
    if (!req.body.contractName) {
        res.json(errMsg('\'contractName\''));
        return;
    }
    if (!req.body.channelName) {
        res.json(errMsg('\'channelName\''));
        return;
    }
    if (!req.body.methodName) {
        res.json(errMsg('\'methodName\''));
        return;
    }
    if (!req.body.userName) {
        res.json(errMsg('\'userName\''));
        return;
    }
    if (!req.body.args) {
        res.json(errMsg('\'args\''));
        return;
    }
    var contractName = req.body.contractName;
    var channelName = req.body.channelName;
    var methodName = req.body.methodName;
    var userName = req.body.userName;
    var args = req.body.args;

    var movieDetail = await query.query(contractName, channelName, userName, methodName, args)
    res.send(movieDetail)
})

module.exports = router;
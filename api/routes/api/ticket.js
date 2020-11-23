const mongoose = require('mongoose');
const router = require('express').Router();
const invoke = require('../../app/invoke')
const query = require('../../app/query')
const errMsg = require('../../utils/errMsg')

const Tickets = mongoose.model('Tickets');

// Invoke transaction
router.post('/bookTicket', async (req, res) => {

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

    var Ticket = new Tickets()
    var response = await invoke.invoke(contractName, channelName, methodName, userName, args)

    if (response) {

        Ticket.TicketId = response.data.ticketId,
            Ticket.MovieId = response.data.movieId,
            Ticket.MovieName = response.data.movie,
            Ticket.Schedule = response.data.schedule,
            Ticket.Auditorium = response.data.audi,
            Ticket.Seats = response.data.seats,
            Ticket.TotalAmount = response.data.totalAmount,
            Ticket.Water = response.data.water,
            Ticket.Popcorn = response.data.popcorn,
            Ticket.Soda = response.data.soda

        Ticket.save((err, inserted) => {
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


router.get('/getAllTickets', async (req, res) => {
    Tickets.find((err, ticket) => {
        if (err) {
            return res.json({
                'success': false,
                'data': null,
                'message': 'Internal server error'
            });
        } else {
            if (ticket.length == 0) {
                return res.status(401).json({
                    'success': false,
                    'data': null,
                    'message': 'Tickets not found'
                })
            } else {
                return res.json({
                    'success': true,
                    'data': ticket,
                    'message': 'tickets list'
                });
            }
        }
    })
})

router.post('/queryTicketDetail', async (req, res) => {

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

    var ticketDetail = await query.query(contractName, channelName, userName, methodName, args)
    res.send(ticketDetail)
})

// Invoke transaction
router.post('/exchangeWaterWithSoda', async (req, res) => {

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

    var ticketId = args[1]

    var response = await invoke.invoke(contractName, channelName, methodName, userName, args)

    if (response) {
        Tickets.findOneAndUpdate({ "TicketId": ticketId }, { "$set": { "Water": "false", "Soda": "true" } }, (err, result) => {
            if (err) {
                return res.json({
                    'success': false,
                    'data': null,
                    'message': 'Internal server error'
                })
            } else {
                return res.json({
                    'success': true,
                    'data': response,
                    'message': 'Exchange successfull'
                })
            }
        })
    }
})

module.exports = router;
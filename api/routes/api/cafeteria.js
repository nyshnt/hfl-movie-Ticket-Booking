
const mongoose = require('mongoose');
const router = require('express').Router();
const invoke = require('../../app/invoke')
const errMsg = require('../../utils/errMsg')

const Cafeteria = mongoose.model('Cafeteria')


// Add Cafeteria Details
router.post('/addCafeDetails', async (req, res) => {

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
    var Cafe = new Cafeteria()

    Cafe.CafeId = args[0]
    Cafe.Soda = args[1]

    Cafeteria.find(async (err, cafe) => {
        if (cafe.length == 1) {
            return res.json({
                'success': true,
                'data': cafe,
                'message': 'Cafe details already available.',
            });
        } else {
            var response = await invoke.invoke(contractName, channelName, methodName, userName, args)
            if (response) {
                Cafe.save((err, inserted) => {
                    if (err) {
                        return res.json({
                            'success': false,
                            'data': null,
                            'message': 'Internal server Error',
                        });
                    } else {
                        res.send(response)
                    }
                })
            }
        }
    })
})

router.get('/getCafeteriaDetails', async (req, res) => {
    Cafeteria.find((err, cafe) => {
        if (err) {
            return res.json({
                'success': false,
                'data': null,
                'message': 'Internal server error.'
            });
        } else {
            if (cafe.length == 0) {
                return res.json({
                    'success': false,
                    'data': null,
                    'message': 'Cafeteria detail not found.'
                })
            } else {
                return res.json({
                    'success': true,
                    'data': cafe,
                    'message': "cafe details"
                });
            }
        }
    })
})

module.exports = router;
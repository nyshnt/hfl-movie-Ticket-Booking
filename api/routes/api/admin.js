const router = require('express').Router();
const admin = require('../../app/enrollAdmin')
const user = require('../../app/registerUser')
const errMsg = require('../../utils/errMsg')


// Enroll Admin
router.post('/enrollAdmin', async (req, res) => {
    var orgName = req.body.orgName
    if (!orgName) {
        res.json(errMsg('\'org\''));
        return;
    }
    let response = await admin.enrollAdmin(orgName)
    res.send(response)
})

// Register user 
router.post('/registeruser', async (req, res) => {
    var userName = req.body.userName;
    var org = req.body.orgName;
    if (!userName) {
        res.json(errMsg('\'userName\''));
        return;
    }
    if (!org) {
        res.json(errMsg('\'org\''));
        return;
    }
    var response = await user.registerUser(userName, org)
    res.send(response)
})

module.exports = router;
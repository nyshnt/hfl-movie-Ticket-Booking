'use strict';

const { Gateway, Wallets } = require('fabric-network');
const fs = require('fs');
const path = require('path');

async function invoke(contractName, channelName, method, userName, args) {
    try {
        // load the network configuration
        const ccpPath = path.resolve(__dirname, 'Connection.json');
        let ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));

        // Create a new file system based wallet for managing identities.
        const walletPath = path.join(process.cwd(), 'wallet');
        const wallet = await Wallets.newFileSystemWallet(walletPath);


        // Check to see if we've already enrolled the user.
        const identity = await wallet.get(userName);
        if (!identity) {
            let message = {
                "success": false,
                "data": null,
                "message": "User does not exist, register user first."
            }
            return message;
        }

        // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway();
        await gateway.connect(ccp, { wallet, identity: userName, discovery: { enabled: true, asLocalhost: true } });

        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork(channelName);

        // Get the contract from the network.
        const contract = network.getContract(contractName);

        // Submit the specified transaction.
        var data = await contract.submitTransaction(method, ...args);
        var str = data.toString()

        let result = {
            'success': true,
            'data': JSON.parse(str),
            'message': "Transaction submitted successfully !",
        }

        // Disconnect from the gateway.
        await gateway.disconnect();

        return result
    } catch (error) {
        let errMsg = {
            'success': false,
            'data': null,
            'message': error.message
        }
        return errMsg
    }
}

exports.invoke = invoke;

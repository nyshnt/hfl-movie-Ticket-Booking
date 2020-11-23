/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { Gateway, Wallets } = require('fabric-network');
const path = require('path');
const fs = require('fs');


async function query(contractName, channelName, userName, methodName, args) {
    try {
        // load the network configuration
        const ccpPath = path.resolve(__dirname, 'Connection.json');
        const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));

        // Create a new file system based wallet for managing identities.
        const walletPath = path.join(process.cwd(), 'wallet');
        const wallet = await Wallets.newFileSystemWallet(walletPath);

        // Check to see if we've already enrolled the user.
        const identity = await wallet.get(userName);
        if (!identity) {
            let message = {
                'success': false,
                'data': null,
                'message': "User does not exist, register user first."
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

        // Evaluate the specified transaction.
        const result = await contract.evaluateTransaction(methodName, ...args);
        var str = result.toString()

        let data = {
            'success': true,
            'data': JSON.parse(str),
            'message': "Transaction has been evaluated!"
        }

        // Disconnect from the gateway.
        await gateway.disconnect();
        return data;

    } catch (error) {
        let errMsg = {
            'success': false,
            'data': null,
            'message': error.message
        }
        return errMsg
    }
}

exports.query = query;

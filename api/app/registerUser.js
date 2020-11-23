/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { Wallets } = require('fabric-network');
const FabricCAServices = require('fabric-ca-client');
const fs = require('fs');
const path = require('path');

const admin = require('./enrollAdmin')

async function registerUser(userName, org) {
    try {
        // load the network configuration
        const ccpPath = path.resolve(__dirname, 'Connection.json');
        const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));

        // Create a new CA client for interacting with the CA.
        const caURL = ccp.certificateAuthorities[org].url;
        const ca = new FabricCAServices(caURL);

        // Create a new file system based wallet for managing identities.
        const walletPath = path.join(process.cwd(), 'wallet');
        const wallet = await Wallets.newFileSystemWallet(walletPath);

        // Check to see if we've already enrolled the user.
        const userIdentity = await wallet.get(userName);
        if (userIdentity) {
            var msg = {
                'success': true,
                'data': null,
                'message': `An identity for the user ${userName} already exists in the wallet.`
            }
            return msg
        }

        // Check to see if we've already enrolled the admin user.
        const adminIdentity = await wallet.get('admin');
        if (!adminIdentity) {
            let msg = {
                'success': true,
                'data': null,
                'message': "Admin does not exist in the wallet, enroll admin first."
            }
            return msg;
        }

        // build a user object for authenticating with the CA
        const provider = wallet.getProviderRegistry().getProvider(adminIdentity.type);
        const adminUser = await provider.getUserContext(adminIdentity, 'admin');

        // Register the user, enroll the user, and import the new identity into the wallet.
        const secret = await ca.register({
            affiliation: 'org1.department1',
            enrollmentID: userName,
            role: 'client'
        }, adminUser);
        const enrollment = await ca.enroll({
            enrollmentID: userName,
            enrollmentSecret: secret
        });
        const x509Identity = {
            credentials: {
                certificate: enrollment.certificate,
                privateKey: enrollment.key.toBytes(),
            },
            mspId: 'Org1MSP',
            type: 'X.509',
        };
        await wallet.put(userName, x509Identity);
        let response = {
            'success': true,
            'data': null,
            'message': `Successfully registered user ${userName} and imported into the wallet`
        }
        return response
    } catch (error) {
        let errMsg = {
            'success': false,
            'data': null,
            'message': error.message
        }
        return errMsg
    }
}

exports.registerUser = registerUser;

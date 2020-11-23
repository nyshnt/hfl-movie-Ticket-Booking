'use strict';

const FabricCAServices = require('fabric-ca-client');
const { Wallets } = require('fabric-network');
const fs = require('fs');
const path = require('path');

async function enrollAdmin(org) {
    try {
        // load the network configuration
        const ccpPath = path.resolve(__dirname, 'Connection.json');
        const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));

        // Create a new CA client for interacting with the CA.
        const caInfo = ccp.certificateAuthorities[org];
        const ca = new FabricCAServices(caInfo.url);

        // Create a new file system based wallet for managing identities.
        const walletPath = path.join(process.cwd(), 'wallet');
        const wallet = await Wallets.newFileSystemWallet(walletPath);

        // Check to see if we've already enrolled the admin user.
        const identity = await wallet.get('admin');
        if (identity) {
            return {
                'success': false,
                'data': null,
                "message": "An identity for the admin already exists in the wallet"
            }
        }

        // Enroll the admin user, and import the new identity into the wallet.
        const enrollment = await ca.enroll({ enrollmentID: 'admin', enrollmentSecret: 'adminpw' });
        const x509Identity = {
            credentials: {
                certificate: enrollment.certificate,
                privateKey: enrollment.key.toBytes(),
            },
            mspId: 'Org1MSP',
            type: 'X.509',
        };
        await wallet.put('admin', x509Identity);
        var response = {
            'success': true,
            'data': null,
            'message': 'Admin enrolled Successfully',
        };
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

exports.enrollAdmin = enrollAdmin;

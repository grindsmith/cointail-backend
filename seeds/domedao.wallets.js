0xadf27ee1A23D5Df947d37CF65f1a10872e03d333
const User = require('../models/users');

const knownWallets = [
    {
        'address': '0xEBe035dA5DF98E8297D31cFD1c249732a6d6d3bA',
        'name': 'Evan',
        'chain': 'ethereum'
    },
    {
        'address': '0x8a76eA819F06b974b75f22C63727c7335f7ebdc3',
        'name': 'Evan',
        'chain': 'ethereum'
    },
    {
        'address': '0xadf27ee1A23D5Df947d37CF65f1a10872e03d333',
        'name': 'Soham',
        'chain': 'ethereum'
    }
];

/**
 * TODO
 * Create 2 groups: WagmiTV & Only Evan 
 * Create a sharing link: How to bring people onto the platform? Discord?
 * --> Network Effects 
 * 
 */

const importKnownWallets = (knownWallets) => {
    // Step 1: Create Users & retain User Ids
    knownWallets.forEach((wallet) => {
        try {
            new User({
                'address': wallet.address,
                'name': wallet.name,
                'chain': wallet.chain
            }).save();
        } catch (err) {
            console.erroer(err);
        }
    });

    // Step 2: Create Group and retain Group Id

    // Step 3: Create GroupUser records from userIds and groupIds
}

importKnownWallets(knownWallets);
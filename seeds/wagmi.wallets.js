const Wallets = require('../models/wallets');
const Groups = require('../models/groups');
const GroupWallets = require('../models/groupWallets');

const wallets = [{
    'address': '0x8a76ea819f06b974b75f22c63727c7335f7ebdc3',
    'name': 'Evan',
    'chain': 'ETH_MAINNET'
},{
    'address': '0xadf27ee1a23d5df947d37cf65f1a10872e03d333',
    'name': 'Soham',
    'chain': 'ETH_MAINNET'
},{
    'address': '0xebe035da5df98e8297d31cfd1c249732a6d6d3ba',
    'name': 'Evan',
    'chain': 'ETH_MAINNET'
},{
    'address': '0x6ad20f932777ddd528bb1d9721f18ada94c256db',
    'name': 'Evan - Test MetaMask',
    'chain': 'ETH_MAINNET'
}];

const groups = [{
    'name': 'All Users',
    'description': 'All users in the app',

},{
    'name': 'Wagmi Crew',
    'description': 'Just the Wagmi Crew',
}]

const importKnownWallets = async (knownWallets, knownGroups) => {
    /**
     * Step 1: Create the Wallets
     */
    await knownWallets.forEach(async (wallet) => {
        try {
            await new Wallets({ 
                'address': wallet.address, 
                'name': wallet.name, 
                'chain': wallet.chain 
            }).save();
        } catch (err) {
            console.error(err);
        }
    });


    /**
     * Step 2: Create the Groups
     */
    await knownGroups.forEach(async (group) => {
        try {
            await new Groups({ 
                'name': group.name, 
                'description': group.description
            }).save();
        } catch (err) {
            console.error(err);
        }
    })

    /**
     * Step 3: Add All Wallets to Both Groups
     */
    let allWalletsRaw = await Wallets.fetchAll();
    let allWallets = JSON.parse(JSON.stringify(allWalletsRaw));

    let allGroupsRaw = await Groups.fetchAll();
    let allGroups = await JSON.parse(JSON.stringify(allGroupsRaw));

    await allGroups.forEach(async (group) => {
        await allWallets.forEach(async (wallet) => {
            await new GroupWallets({
                'wallet_id': wallet.id,
                'group_id': group.id,
                'group_owner': false
            }).save();
        })
    })

    let groupWalletsRaw = await GroupWallets.fetchAll();
    console.log(JSON.parse(JSON.stringify(groupWalletsRaw)));
}

importKnownWallets(wallets, groups);
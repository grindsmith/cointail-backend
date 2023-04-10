const Wallets = require('../models/wallets');
const Groups = require('../models/groups');
const GroupWallets = require('../models/groupWallets');

const wallets = [{
    'address': '0x8a76eA819F06b974b75f22C63727c7335f7ebdc3',
    'name': 'Evan',
    'chain': 'ethereum'
},{
    'address': '0xadf27ee1A23D5Df947d37CF65f1a10872e03d333',
    'name': 'Soham',
    'chain': 'ethereum'
},{
    'address': '0xEBe035dA5DF98E8297D31cFD1c249732a6d6d3bA',
    'name': 'Evan',
    'chain': 'ethereum'
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
            await new Wallets({ 'address': wallet.address, 'name': wallet.name, 'chain': wallet.chain }).save();
        } catch (err) {
            console.erroer(err);
        }
    });


    /**
     * Step 2: Create the Groups
     */
    let adminRaw = await Wallets.where('id',1).fetch();
    let admin = JSON.parse(JSON.stringify(adminRaw));

    await knownGroups.forEach(async (group) => {
        try {
            await new Groups({ 'name': group.name, 'description': group.description, 'ownerId': admin.id }).save();
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
                'group_id': group.id
            }).save();
        })
    })

    let groupWalletsRaw = await GroupWallets.fetchAll();
    console.log(JSON.parse(JSON.stringify(groupWalletsRaw)));
}

importKnownWallets(wallets, groups);
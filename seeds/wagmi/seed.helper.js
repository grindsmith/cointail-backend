const Wallets = require('../models/wallets');
const Groups = require('../models/groups');
const GroupWallets = require('../models/groupWallets');
const WalletFollowers = require('../models/walletFollowers');

async function createWallets (knownWallets) {
  await knownWallets.forEach(async (wallet) => {
    try {
        await new Wallets({ 'address': wallet.address, 'name': wallet.name, 'chain': wallet.chain }).save();
    } catch (err) { 
        console.error(err);
    }
  });

  return;
}

async function createGroups () {
  await knownGroups.forEach(async (group) => {
    try {
        await new Groups({ 'name': group.name, 'description': group.description }).save();
    } catch (err) {
        console.error(err);
    }
  })

  return;
}

async function createGroupWallets () {
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
}

async function createWalletFollowers (address) {
  let walletsRaw =  await Wallets.fetchAll();

  let wallets = JSON.parse(JSON.stringify(walletsRaw));

  let follower = wallets.find((wallet) => wallet.address === address.toLowerCase());

  for (let i = 0; i < wallets.length; i++) 
  {
    if (wallets[i].id !== follower.id) 
    {
      await new WalletFollowers({ 'wallet_id': wallets[i].id, 'follower_id': follower.id }).save();
    }
  }
}

module.exports = {
  createWallets,
  createGroups,
  createGroupWallets,
  createWalletFollowers
}
const Wallets = require('../models/wallets');
const WalletFollowers = require('../models/walletFollowers');

async function findOrCreateWallet(address) {
  try {
    let foundWallet = await Wallets.where('address', address).fetch();

    return foundWallet;
  } catch (err) {
    if (err.message == 'EmptyResponse') {
        let saved = await new Wallets({ 
            address: address, 
            chain: 'ethereum', 
            name: 'New Wallet 0x' + address.substr(address.length - 6),
      }).save(); 

      return saved;
    } else {
        console.log(err);
    }
  }
}

async function findOrCreateGroupWallet(walletId, groupId) {
  try {
    let foundGroupWallet = await GroupWallets.where({
      'wallet_id': walletId,
      'group_id': groupId
    }).fetch();

    return foundGroupWallet
  } catch (err) {
    if (err.message == 'EmptyResponse') {
      let saved = await new GroupWallets({ 
        'wallet_id': walletId, 
        'group_id': groupId, 
      }).save(); 

      return saved;
    } else {
        console.log(err);
    }
  }
}

async function findWalletInArrayByAddress (wallets, address) {
  for (let i = 0; i < wallets.length; i++)
  {
    if (wallets[i].address === address) 
    {
      return wallets[i];
    }
  }
}

async function findWalletFollowers (field, walletId) {
  let walletFollowers = await WalletFollowers.where(field, walletId).fetchAll();

  let walletFollowerIds = JSON.parse(JSON.stringify(walletFollowers)).map((followers) => followers.id);

  let followerWallets = await Wallets.where('id', 'in', walletFollowerIds).fetchAll();

  return JSON.parse(JSON.stringify(followerWallets)) || [];
}


module.exports = {
  findOrCreateWallet,
  findOrCreateGroupWallet,
  findWalletInArrayByAddress,
  findWalletFollowers
}
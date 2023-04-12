const Wallets = require('../models/wallets');

async function findOrCreateWallet(address) {
  try {
    let foundWallet = await Wallets.where('address', address).fetch();

    return foundWallet;
  } catch (err) {
    if (err.message == 'EmptyResponse') {
        let saved = await new Wallets({ 
            address: address, 
            chain: 'ethereum', 
            name: 'Placeholder'
      }).save(); 

      return saved;
    } else {
        console.log(err);
    }
  }
}

module.exports = {
  findOrCreateWallet,
}
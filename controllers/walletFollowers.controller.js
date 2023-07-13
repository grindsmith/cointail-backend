// Database Models
const Wallets = require('../models/wallets');
const WalletFollowers = require('../models/walletFollowers');

module.exports = {
  getWalletFollowers: async function (req, res) {
    const { address } = req.query;

    let walletRaw = await Wallets.where('address', address.toLowerCase()).fetch();

    let wallet = JSON.parse(JSON.stringify(walletRaw));

    console.log(wallet);

    let walletFollowers = await WalletFollowers.where('wallet_id', wallet.id).fetchAll({withRelated: ['wallet','follower']});

    return res.json(walletFollowers);
  },
  postWalletFollower: async function (req, res) {
    const { walletId, followerId } = req.body;

    let walletFollower = await new WalletFollowers({
      'wallet_id': walletId,
      'follower_id': followerId,
    }).save();

    return res.json({ walletFollower });
  }
}
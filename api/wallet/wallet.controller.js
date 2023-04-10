require('dotenv').config();
const Wallets = require('../models/wallets');
const Moment = require('momenttimezone');

module.exports = {
  getGroupsByWallet: async (req, res) => {

  },
  getWallets: async (req, res) => {
    console.log('GET_WALLET');

    try {
      let usersRaw = await Wallets.fetchAll();
      let users = JSON.parse(JSON.stringify(usersRaw));

      for (let i = 0; i < users.length; i++) {
          users[i].key = users[i].address;
          users[i].label = users[i].name;
          users[i].bottomLeftText = "0x" + users[i].address.substr(users[i].address.length - 6);
          users[i].topRightText = Moment(users[i].created_at).format('LL');
      }
      return res.json({
          users: users,
      })
    } catch (err) {
        console.log(err);
    }
  },
  postWallet: async (req, res) => {
    console.log('POST_APP_ACCOUNT');

    const { address } = req.body;

    try {
        let saved = await Wallets.where('address', address).fetch();

        return res.json({ wallet: saved });
    } catch (err) {
        if (err.message == 'EmptyResponse') {
            let saved = await new Wallets({ 
                address: address, 
                chain: 'ethereum', 
                name: 'Placeholder'
          }).save(); 

          return res.json({ user: saved });
      } else {
          console.log(err);
      }
    }
  },
  putWallet: async (req, res) => {
    console.log('PUT_WALLET');

    const { wallet, name } = req.body;

    try {
        const updated = await Wallets.where('address', wallet).fetch();

        const saved = await updated.save(
        {
            'name': name
        },{ 
              method: 'update'
        });

        return res.json({ saved });
    } catch (error) {
        console.log('Error: ', error.message);
        
        return res.json({ error });
    }
  },
}

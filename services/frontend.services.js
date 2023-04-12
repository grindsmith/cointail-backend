const Moment = require('moment');

/**
 * 
 *      SET NETWORK ENDPOINTS
 * 
 */
async function formatGroupWallets(groupWallets) {
  await groupWallets.forEach((item) => {
    item.key = item.address;
    item.label = item.name;
    item.topRightText = "0x" + item.address.substr(item.address.length - 6);
    item.bottomRightText = Moment(item.created_at).format('LL');
    item.bottomLeftText = 'Wallet';
  })
  
  return groupWallets;
}

module.exports = {
  formatGroupWallets
};
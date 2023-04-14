const Moment = require('moment');

/**
 *      formatGroupWalletsForSplitView
 */
async function formatGroupWalletsForSplitView(groupWallets) {
  await groupWallets.forEach((item) => {
    item.key = item.address;
    item.label = item.name;
    item.topRightText = "0x" + item.address.substr(item.address.length - 6);
    item.bottomRightText = Moment(item.created_at).format('LL');
    item.bottomLeftText = 'Wallet';
  })
  
  return groupWallets;
}

/**
 *      formatGroupWalletsForSplitView
 */
async function formatWalletsForCombobox(wallets) {
  await wallets.forEach((item) => {
    item.key = item.address;
    item.label = item.name;
    item.subTitle = "0x" + item.address.substr(item.address.length - 6);
    item.type = 'account';
  })
  
  return wallets;
}


module.exports = {
  formatGroupWalletsForSplitView,
  formatWalletsForCombobox
};
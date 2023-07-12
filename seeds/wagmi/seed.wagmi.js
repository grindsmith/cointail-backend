const { wallets, groups } = require('./seed.data');

const SeedHelper = require('./seed.helper');

const importKnownWallets = async (knownWallets, knownGroups) => {
    await SeedHelper.createWallets(knownWallets);

    await SeedHelper.createGroups(knownGroups);

    await SeedHelper.createGroupWallets();

    await SeedHelper.createWalletFollowers('0xEBe035dA5DF98E8297D31cFD1c249732a6d6d3bA');

    return;
}

importKnownWallets(wallets, groups);
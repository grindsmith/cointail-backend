require('dotenv').config();

const { Alchemy, Network, Wallet, Utils } = require("alchemy-sdk");

// Configures the Alchemy SDK
const config = {
  apiKey: process.env.ALCHEMY_API_KEY,
  network: Network.ARB_GOERLI,
};

console.log(config)

const alchemy = new Alchemy(config);
const wallet = new Wallet(process.env.COINBASE_PRIVATE_KEY);

const main = async (event) => {
  if (event === "send_transaction") 
  {
    const transaction = {
      to: "0x6Ad20f932777ddd528bB1D9721f18adA94C256dB",
      value: Utils.parseEther("0.0001"),
      gasLimit: "21000",
      maxPriorityFeePerGas: Utils.parseUnits("5", "gwei"),
      maxFeePerGas: Utils.parseUnits("20", "gwei"),
      nonce: await alchemy.core.getTransactionCount(wallet.getAddress()),
      type: 2,
      chainId: 421613, // Corresponds to ETH_GOERLI
    };

    const rawTransaction = await wallet.signTransaction(transaction);

    const response = await alchemy.transact.sendTransaction(rawTransaction);

    console.log(response);
  } 
  else if ('check_balance');
  {
    let response = await alchemy.core.getBalance("0xEBe035dA5DF98E8297D31cFD1c249732a6d6d3bA", "latest")
    
    const wei = response.toString() 
    const gwei = wei * 0.000000001;
    const eth = gwei * 0.000000001;

    console.log(`ETH Balance: ${eth}`);
  }
}

// main('check_balance');
main('send_transaction');
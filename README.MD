# Web3 Sandbox Backend 

## API Structure



## Versions

### Version 1.1 
Description: View all wallets in the public group "All Users"

1. API Change
Eth
- GET /api/eth/${chain}/${network}/wallet/:wallet/tokens
- GET /api/eth/${chain}/${network}/wallet/:wallet/transactions

Wallets
- GET /api/wallet/:wallet
- GET /api/wallet/:wallet/groups
- POST /api/wallet
- PUT /api/wallet

Groups
- GET /api/group
- POST /api/wallet
- PUT /api/wallet

### Version 1.0
Description: View all wallets in the app

1. API Changes
 - 5 Wallet Endpoint
    1. GET: /api/user
    2. PUT: /api/user
    3. POST: /api/user
    4. GET: /api/user/:wallet/tokens/ethereum
    5. GET: /api/user/:wallet/transactions/ethereum

 - 1 Token Endpoint
2. Database Changes
3. Other





[LEGACY NOTES]
# Solana

## Anchor Framework
- built by Project Serum
- Anchor porgram consists of the 3 parts:
    - Program Module = where the program logic is written
    - Account structs = where accounts are validataed
    - Declare ID macro = stores the address of the program
- handles serializing and deserializing byte arrays to pass in as function parameters
- IDL: similar to the ADL file in Solidity
- Anchor as a framework to build Solana Programs
- Web3.js as a library to build Client Front End

### General Notes
- Solana seperates code from data
- all programs are stateless, any data that they work with must be pased in by reference from the outside
- Accounts: basically collections of realted information, similar to a file in an operating system.
- used and owned by programs and a single program can own many accounts
- like a file, acounts can store arbitrary kinds of data (integers, strings, pubkeys) as well as SOL
- also contains metadata for who can access it and how long the account can live for
- anyone can read an account, only the account owner can modify its data
- 1 Lamport = 0.000000001 SOL
- 4 Clusters (Cluster = Network)
    - Mainnet (global)
    - Devnet (global)
    - Testnet (global)
    - Localnet / Test Validator (your local computer)
- Progrma = on chain smart contract
- Account = data for programs (actually a buffer/file)
    - held in validator memory and pay 'rent' to stay
- Basic operation unit on solana is an insturction
- Instruction is plit into three different parts:
    - Program ID: send the smart contract that will be executed
    - Accounts: send the accounts that will partake in the instruction
    - Intsturction Data
- Transaction = list of instructions
- You can build Solana programs in Rust, C, C++
- JSON RPC API
- Solana Programs (smart contracts) are immutable meaning they can't be changed
## Magic Eden

### Program Derived Addresses
- allow programs to sign for accounts while guaranteeing that no external user could also generate a valid signature for the same account
- technically not created, instead they are found
- Understanding PDAs: https://www.brianfriel.xyz/understanding-program-derived-addresses/
- ed25519 elliptic curve: https://en.wikipedia.org/wiki/EdDSA

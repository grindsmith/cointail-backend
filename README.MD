# Web3 Sandbox Backend 

## Versions
### Version 1.1 [ACTIVE]
Description: View all wallets in the public group "All Users"

#### Current: Version API Structure
##### /api/eth/{chain}/{network}/wallet/{wallet}/tokens 
- GET: eth.getWalletTokens
##### /api/eth/{chain}/{network}/wallet/{wallet}/transactions
- GET: eth.getWalletTransactions
##### /api/groups
- GET: group.getAllGroups
##### /api/group/{groupId}
- GET: group.getGroup
##### /api/group/
- POST: group.postGroup
##### /api/group-wallet
- POST: groupWallet.postGroupWallet
##### /api/notify
- POST: notify.postWalletTransaction
##### /api/wallets
- GET: wallet.getAllWallets
##### /api/wallet
- GET: wallet.getWallet
- POST: wallet.postWallet
- PUT: wallet.putWallet

#### Version Table Structure
##### Wallets
Fields: 
- id: integer
- name: string 
- chain: string 
- address: unique 
- created_at: date/time 
- updated_at: date/time

##### Groups
Fields: 
- id: integer
- name: string 
- description: string 
- created_at: date/time 
- updated_at: date/time

##### Group_Wallets
Fields: 
- id: integer
- group_id: integer 
- wallet_id: integer 
- group_owner: boolean 
- created_at: date/time 
- updated_at: date/time

### Version 1.0 [INACTIVE]
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
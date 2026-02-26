# Technical Assessment: Blockchain API Integration

## 📋 Submission Overview

This project demonstrates a blockchain API integration that connects to Ethereum mainnet and retrieves smart contract data from the USDT token contract.

**Candidate Implementation:**
- API Module: `fairuzakhdanApiTest.js`
- Test Script: `directTest.js`
- Blockchain: Ethereum Mainnet
- Smart Contract: USDT (Tether USD)

---

## 🚀 Quick Start Guide

### Prerequisites
- Node.js v18 or later
- npm or yarn
- Internet connection (for blockchain RPC)

### Installation & Running

**1. Install Dependencies**
```bash
npm install
```

**2. Run Blockchain API Test (Recommended)**
```bash
node directTest.js
```

This will:
- ✅ Connect to Ethereum mainnet
- ✅ Retrieve network information (Chain ID, Block Number)
- ✅ Query USDT smart contract data
- ✅ Display contract details (Name, Symbol, Decimals, Total Supply)
- ✅ Check sample wallet balance

**Expected Output:**
```
==================================================
BLOCKCHAIN API TEST - DIRECT EXECUTION
==================================================

📡 Connecting to Ethereum mainnet...
✅ Getting network information...
   Network: homestead
   Chain ID: 1

📦 Getting latest block...
   Block Number: [current block]

🔗 Connecting to USDT smart contract...
   Address: 0xdAC17F958D2ee523a2206206994597C13D831ec7

📊 Retrieving contract data...
   Name: Tether USD
   Symbol: USDT
   Decimals: 6
   Total Supply: [amount] USDT

💰 Checking sample wallet balance...
   Address: 0x28C6c06298d514Db089934071355E5743bf21d60
   Balance: [amount] USDT

==================================================
✅ TEST COMPLETED SUCCESSFULLY!
==================================================
```

---

## 🔌 Alternative: Run via API Endpoint

**1. Start Server**
```bash
npm run server
```

**2. Test API Endpoint**

Open browser or use curl:
```bash
curl http://localhost:5026/api/blockchain-test
```

Or visit: `http://localhost:5026/api/blockchain-test`

---

## 📁 Project Structure

```
technical-assessment436/
├── server/
│   └── routes/
│       └── api/
│           └── blockchainApiTest.js    # Main API implementation
├── directTest.js                        # Standalone test script
├── server.js                            # Express server entry point
├── package.json                         # Dependencies
└── README.md                            # This file
```

---

## 🔧 Technical Implementation

### API Module: `blockchainApiTest.js`

**Location:** `server/routes/api/blockchainApiTest.js`

**Endpoint:** `GET /api/blockchain-test`

**Features:**
- Connects to Ethereum mainnet via public RPC
- Retrieves network information (name, chainId)
- Gets latest block number
- Queries USDT smart contract:
  - Contract address: `0xdAC17F958D2ee523a2206206994597C13D831ec7`
  - Functions called: `name()`, `symbol()`, `decimals()`, `totalSupply()`, `balanceOf()`
- Returns structured JSON response

**Technology Stack:**
- **ethers.js v5.7.2** - Ethereum library
- **Express.js** - Web framework
- **Node.js** - Runtime environment

---

## 🌐 Blockchain Details

- **Network:** Ethereum Mainnet
- **RPC Provider:** `https://ethereum.publicnode.com`
- **Smart Contract:** USDT (Tether USD)
- **Contract Address:** `0xdAC17F958D2ee523a2206206994597C13D831ec7`
- **Sample Wallet:** Binance Hot Wallet (`0x28C6c06298d514Db089934071355E5743bf21d60`)

---

## 🎯 Assessment Requirements Met

✅ **New API module created** - `blockchainApiTest.js`  
✅ **Connects to blockchain network** - Ethereum Mainnet  
✅ **Interacts with smart contract** - USDT Token  
✅ **Retrieves on-chain data** - Contract state & balances  
✅ **Console/log output** - Detailed execution logs  
✅ **Uses standard libraries** - ethers.js  
✅ **Integrated with existing project** - Express routes  
✅ **Error handling** - Try-catch with meaningful errors  

---

## 🐛 Troubleshooting

### Issue: "Cannot find module 'ethers'"
**Solution:**
```bash
npm install
```

### Issue: RPC connection timeout
**Solution:** The script uses public RPC which may be slow. Wait 10-30 seconds or change RPC in `directTest.js` line 28:
```javascript
const provider = new ethers.providers.JsonRpcProvider('https://rpc.ankr.com/eth');
```

### Issue: Port 5026 already in use
**Solution:** Change PORT in `server.js` or kill existing process:
```bash
# Windows
netstat -ano | findstr :5026
taskkill /PID [PID] /F

# Linux/Mac
lsof -ti:5026 | xargs kill -9
```

---

## 📦 Environment

**Node version:** v18 or later  
**OS:** Mac, Linux, Windows (PowerShell/CMD recommended)  
**Package Manager:** npm  

---

## 📝 Notes

- No database or authentication required for this assessment
- Frontend UI is part of the original project but not required for blockchain API test
- The API can run independently via `directTest.js` or through the full server
- All blockchain data is retrieved in real-time from Ethereum mainnet

---

## 👤 Submission

**Candidate:** [Your Name]  
**Date:** February 26, 2026  
**Assessment:** Blockchain API Integration  

---

## 📞 Support

For any issues running this project, please ensure:
1. Node.js v18+ is installed
2. All dependencies are installed (`npm install`)
3. Internet connection is active (for blockchain RPC)
4. No firewall blocking outbound connections

**Estimated execution time:** 5-15 seconds (depending on RPC speed)

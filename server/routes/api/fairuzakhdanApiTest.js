const express = require('express');
const router = express.Router();
const { ethers } = require('ethers');

// USDT Contract on Ethereum Mainnet
const USDT_ADDRESS = '0xdAC17F958D2ee523a2206206994597C13D831ec7';
const USDT_ABI = [
  'function name() view returns (string)',
  'function symbol() view returns (string)',
  'function decimals() view returns (uint8)',
  'function totalSupply() view returns (uint256)',
  'function balanceOf(address) view returns (uint256)'
];

// @route    GET api/blockchain-test
// @desc     Test blockchain connection and retrieve smart contract data
// @access   Public
router.get('/', async (req, res) => {
  try {
    console.log('\n=== Blockchain API Test Started ===');
    
    // Connect to Ethereum mainnet via public RPC (with timeout)
    const provider = new ethers.providers.JsonRpcProvider({
      url: 'https://ethereum.publicnode.com',
      timeout: 10000
    });
    
    // Get network info
    const network = await provider.getNetwork();
    console.log(`Connected to network: ${network.name} (chainId: ${network.chainId})`);
    
    // Get latest block
    const blockNumber = await provider.getBlockNumber();
    console.log(`Latest block number: ${blockNumber}`);
    
    // Connect to USDT contract
    const contract = new ethers.Contract(USDT_ADDRESS, USDT_ABI, provider);
    
    // Retrieve contract data
    const name = await contract.name();
    const symbol = await contract.symbol();
    const decimals = await contract.decimals();
    const totalSupply = await contract.totalSupply();
    
    // Get balance of a known address (Binance wallet)
    const binanceAddress = '0x28C6c06298d514Db089934071355E5743bf21d60';
    const balance = await contract.balanceOf(binanceAddress);
    
    const result = {
      network: {
        name: network.name,
        chainId: network.chainId
      },
      blockNumber,
      contract: {
        address: USDT_ADDRESS,
        name,
        symbol,
        decimals,
        totalSupply: ethers.utils.formatUnits(totalSupply, decimals),
        sampleBalance: {
          address: binanceAddress,
          balance: ethers.utils.formatUnits(balance, decimals)
        }
      }
    };
    
    console.log('\n=== Contract Data Retrieved ===');
    console.log(`Contract: ${name} (${symbol})`);
    console.log(`Decimals: ${decimals}`);
    console.log(`Total Supply: ${result.contract.totalSupply} ${symbol}`);
    console.log(`Sample Balance (${binanceAddress}): ${result.contract.sampleBalance.balance} ${symbol}`);
    console.log('=== Test Completed Successfully ===\n');
    
    res.json({
      success: true,
      data: result
    });
    
  } catch (error) {
    console.error('\n=== Error occurred ===');
    console.error(error.message);
    console.error('======================\n');
    
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

module.exports = router;

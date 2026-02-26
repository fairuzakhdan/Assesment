/**
 * Direct Blockchain API Test
 * Run this file directly to test blockchain integration without starting the full server
 * 
 * Usage: node directTest.js
 */

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

async function testBlockchainConnection() {
  try {
    console.log('\n' + '='.repeat(50));
    console.log('BLOCKCHAIN API TEST - DIRECT EXECUTION');
    console.log('='.repeat(50) + '\n');
    
    console.log('📡 Connecting to Ethereum mainnet...');
    const provider = new ethers.providers.JsonRpcProvider('https://ethereum.publicnode.com');
    
    console.log('✅ Getting network information...');
    const network = await provider.getNetwork();
    console.log(`   Network: ${network.name}`);
    console.log(`   Chain ID: ${network.chainId}`);
    
    console.log('\n📦 Getting latest block...');
    const blockNumber = await provider.getBlockNumber();
    console.log(`   Block Number: ${blockNumber}`);
    
    console.log('\n🔗 Connecting to USDT smart contract...');
    console.log(`   Address: ${USDT_ADDRESS}`);
    const contract = new ethers.Contract(USDT_ADDRESS, USDT_ABI, provider);
    
    console.log('\n📊 Retrieving contract data...');
    const [name, symbol, decimals, totalSupply] = await Promise.all([
      contract.name(),
      contract.symbol(),
      contract.decimals(),
      contract.totalSupply()
    ]);
    
    console.log(`   Name: ${name}`);
    console.log(`   Symbol: ${symbol}`);
    console.log(`   Decimals: ${decimals}`);
    console.log(`   Total Supply: ${ethers.utils.formatUnits(totalSupply, decimals)} ${symbol}`);
    
    console.log('\n💰 Checking sample wallet balance...');
    const binanceAddress = '0x28C6c06298d514Db089934071355E5743bf21d60';
    const balance = await contract.balanceOf(binanceAddress);
    console.log(`   Address: ${binanceAddress}`);
    console.log(`   Balance: ${ethers.utils.formatUnits(balance, decimals)} ${symbol}`);
    
    console.log('\n' + '='.repeat(50));
    console.log('✅ TEST COMPLETED SUCCESSFULLY!');
    console.log('='.repeat(50) + '\n');
    
    // Return structured data
    return {
      success: true,
      data: {
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
      }
    };
    
  } catch (error) {
    console.error('\n' + '='.repeat(50));
    console.error('❌ ERROR OCCURRED');
    console.error('='.repeat(50));
    console.error(`Message: ${error.message}`);
    console.error('='.repeat(50) + '\n');
    
    return {
      success: false,
      error: error.message
    };
  }
}

// Run the test
if (require.main === module) {
  testBlockchainConnection()
    .then(result => {
      console.log('\n📋 JSON Response:');
      console.log(JSON.stringify(result, null, 2));
      process.exit(0);
    })
    .catch(error => {
      console.error('Fatal error:', error);
      process.exit(1);
    });
}

module.exports = { testBlockchainConnection };

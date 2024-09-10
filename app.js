const { Alchemy, Network, Utils } = require("alchemy-sdk");
require('dotenv').config();

// Configure Alchemy SDK
const config = {
  apiKey: process.env.ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};
const alchemy = new Alchemy(config);
async function trackDeposits(beaconAddress) {
  try {
    // Get the latest block number
    const latestBlock = await alchemy.core.getBlockNumber();

    // Set a starting block, for example, 100 blocks before the latest
    const startBlock = latestBlock - 5000;

    // Convert the block numbers to hexadecimal
    const fromBlockHex = Utils.hexlify(startBlock);
    const toBlockHex = Utils.hexlify(latestBlock);
    
    // Fetch transactions for the beacon address
    const { transfers } = await alchemy.core.getAssetTransfers({
      fromBlock: fromBlockHex, // Now using a recent starting block
      toBlock: toBlockHex,
      toAddress: beaconAddress,
      category: ["external", "internal"],
      maxCount: 30, // Limit the number of transactions
    });

    // Process and display deposit information
    let result = [];
    for (const transfer of transfers) {
      const block = await alchemy.core.getBlock(transfer.blockNum);
      
      result.push({
        blockNumber: transfer.blockNum,
        blockTimestamp: new Date(block.timestamp * 1000).toISOString(),
        publicKey: transfer.from,
        hash: transfer.hash,
        fee: transfer.value
      });
    }
    return result.reverse();  // Reverse to get latest transactions first

  } catch (error) {
    console.error("Error tracking deposits:", error);
  }
}


// Usage
const beaconAddress = "0x00000000219ab540356cBB839Cbe05303d7705Fa"; // Ethereum 2.0 Deposit Contract

const express = require('express');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.get('/deposits', async (req, res) => {
  const deposits = await trackDeposits(beaconAddress);
  res.json(deposits)
});


app.listen(port, () => {
  console.log(`Deposit tracker API listening at http://localhost:${port}`);
});

// trackDeposits(beaconAddress);
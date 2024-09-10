const { Alchemy, Network, Utils } = require("alchemy-sdk");
require('dotenv').config();


const config = {
  apiKey: process.env.ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};
const alchemy = new Alchemy(config);
async function trackDeposits(beaconAddress) {
  try {
    
    const latestBlock = await alchemy.core.getBlockNumber();

    
    const startBlock = latestBlock - 5000;

    
    const fromBlockHex = Utils.hexlify(startBlock);
    const toBlockHex = Utils.hexlify(latestBlock);
    
    
    const { transfers } = await alchemy.core.getAssetTransfers({
      fromBlock: fromBlockHex, 
      toBlock: toBlockHex,
      toAddress: beaconAddress,
      category: ["external", "internal"],
      maxCount: 30, 
    });

    
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
    return result.reverse();  

  } catch (error) {
    console.error("Error tracking deposits:", error);
  }
}


const beaconAddress = "0x00000000219ab540356cBB839Cbe05303d7705Fa"; 

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

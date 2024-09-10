

# Ethereum Deposite Tracker

This project is an API that tracks deposits made to the Ethereum 2.0 Beacon Chain deposit contract. It uses the Alchemy SDK to fetch transaction data and provides an endpoint to retrieve the latest 2024 deposits.

## Features

- Fetches the latest 2024 deposits to the Ethereum 2.0 Beacon Chain deposit contract
- Provides deposit information including block number, timestamp, sender's public key, transaction hash, and deposit amount
- Returns current timestamp and latest block timestamp
- Uses Express.js to serve the API

## Prerequisites

- Node.js (v12 or later)
- npm (Node Package Manager)
- Alchemy API key

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/ethereum-deposit-tracker.git
   cd ethereum-deposit-tracker
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the root directory and add my Alchemy API key:
   ```
   ALCHEMY_API_KEY=your_alchemy_api_key_here
   ```

## Usage

1. Start the server:
   ```
   node deposite.js
   ```

2. The API will be available at `http://localhost:3000`

3. To fetch the latest deposits, send a GET request to `/deposits`

## API Endpoints

### GET /deposits

Returns the latest 2024 deposits to the Ethereum 2.0 Beacon Chain deposit contract.

Response format:

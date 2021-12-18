const path = require("path");
require("dotenv").config({path: ".env"})

const HdWalletProvider = require("@truffle/hdwallet-provider");
const AccountIndex = 0;

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_build_directory: path.join(__dirname, "client/src/contracts"),
  networks: {
    development: {
      host: "localhost",
      network_id: 5777,
      port: 8545
    },
    ganache_local: {
      provider: function () {
        return new HdWalletProvider(process.env.WALLET_MNEMONIC, "http://localhost:8545", AccountIndex)
      },
      network_id: 5777
    }
  },
  compilers: {
    solc: {
      version: "^0.7.6"
    }
  }
};

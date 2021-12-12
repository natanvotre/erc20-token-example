var MyToken = artifacts.require("./MyToken.sol");
var MyTokenSale = artifacts.require("./MyTokenSale.sol");
require("dotenv").config({path: "../.env"})

module.exports = async function(deployer) {
  initialSupply = process.env.INITIAL_SUPPLY;
  let addresses = await web3.eth.getAccounts();
  await deployer.deploy(MyToken, initialSupply);
  await deployer.deploy(MyTokenSale, 1, addresses[0], MyToken.address);

  let instance = await MyToken.deployed();
  await instance.transfer(MyTokenSale.address, initialSupply);
};

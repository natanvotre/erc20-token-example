var MyToken = artifacts.require("./MyToken.sol");
var KycContract = artifacts.require("./KycContract.sol");
var MyTokenSale = artifacts.require("./MyTokenSale.sol");
require("dotenv").config({path: "../.env"})

module.exports = async function(deployer) {
  initialSupply = process.env.INITIAL_SUPPLY;
  let addresses = await web3.eth.getAccounts();
  await deployer.deploy(MyToken, initialSupply);
  await deployer.deploy(KycContract);
  await deployer.deploy(MyTokenSale, 1, addresses[0], MyToken.address, KycContract.adress);

  let instance = await MyToken.deployed();
  await instance.transfer(MyTokenSale.address, initialSupply);
};

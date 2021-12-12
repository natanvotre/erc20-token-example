var MyToken = artifacts.require("./MyToken.sol");
var MyTokenSale = artifacts.require("./MyTokenSale.sol");

module.exports = async function(deployer) {
  initialSupply = 10000000;
  let addresses = await web3.eth.getAccounts();
  await deployer.deploy(MyToken, initialSupply);
  await deployer.deploy(MyToken, 1, addresses[0], MyToken.address);

  let instance = await MyToken.deployed();
  await instance.transfer(MyTokenSale.address, initialSupply);
};

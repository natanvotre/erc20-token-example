const Token = artifacts.require("MyToken");
const TokenSale = artifacts.require("MyTokenSale");
require("dotenv").config({path: "../.env"})

const chai = require("./setupChai.js");
const BN = web3.utils.BN;
const expect = chai.expect;

contract("TokenSale Test", async (accounts) => {

    const [deployerAccount, recipientAccount, anotherAccount] = accounts;

    it("should not have any token in my deployerAccount", async() => {
        let instance = await Token.deployed();
        return expect(instance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(new BN(0));
    });

    it("all tokens should be in the TokenSale Smart Contract by default", async() => {
        let instance = await Token.deployed();
        let balanceOfTokenSale = await instance.balanceOf(TokenSale.address);
        let totalSupply = await instance.totalSupply();
        return expect(balanceOfTokenSale).to.be.a.bignumber.equal(totalSupply);
    });

    it("should be able to buy tokens", async() => {
        let tokenInstance = await Token.deployed();
        let tokenSaleInstance = await TokenSale.deployed();
        let balanceBefore = await tokenInstance.balanceOf(deployerAccount);
        await expect(tokenSaleInstance.sendTransaction({from: deployerAccount, value: web3.utils.toWei("1", "wei")})).to.eventually.be.fulfilled;
        return expect(tokenInstance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(balanceBefore.add(new BN(1)));
    });

});

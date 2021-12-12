const Token = artifacts.require("MyToken");
require("dotenv").config({path: "../.env"})

const chai = require("./setupChai.js");
const BN = web3.utils.BN;
const expect = chai.expect;

contract("Token Test", async (accounts) => {

    const [deployerAccount, recipientAccount, anotherAccount] = accounts;

    beforeEach(async() => {
        this.myToken = await Token.new(process.env.INITIAL_SUPPLY);
    });

    it("all tokens should be in my account", async () => {
        let instance = this.myToken;
        let totalSupply = await instance.totalSupply();
        return expect(await instance.balanceOf(deployerAccount)).to.be.a.bignumber.equal(totalSupply);
    })

    it("is possible to send tokens between accounts", async () => {
        const nTokens = 1;
        let instance = this.myToken;
        let totalSupply = await instance.totalSupply();
        expect(instance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(totalSupply);
        await expect(instance.transfer(recipientAccount, nTokens)).to.eventually.be.fulfilled;
        expect(instance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(totalSupply.sub(new BN(nTokens)));
        return expect(instance.balanceOf(recipientAccount)).to.eventually.be.a.bignumber.equal(new BN(nTokens));
    })

    it("is not possible to send more tokens than avaiable", async () => {
        let instance = this.myToken;
        let totalSupply = await instance.totalSupply();
        let beforeBalance = await instance.balanceOf(deployerAccount);
        await expect(instance.transfer(recipientAccount, totalSupply+1)).to.eventually.be.rejected;
        return expect(instance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(beforeBalance);
    })
})

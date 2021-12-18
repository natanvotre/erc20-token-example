import React, { Component } from "react";
import getWeb3 from "./getWeb3";

import MyToken from "./contracts/MyToken.json"
import MyTokenSale from "./contracts/MyTokenSale.json"
import KycContract from "./contracts/KycContract.json"

import "./App.css";

class App extends Component {
  state = { loaded:false, kycAddress: "0x123..."};

  getContract = async (solidityContract) => {
    return new this.web3.eth.Contract(
      solidityContract.abi,
      solidityContract.networks[this.networkId] && solidityContract.networks[this.networkId].address,
    );
  }

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      this.web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      this.accounts = await this.web3.eth.getAccounts();

      // Get the contract instance.
      this.networkId = await this.web3.eth.net.getId();

      this.myToken = await this.getContract(MyToken);
      this.myTokenSale = await this.getContract(MyTokenSale);
      this.kycContract = await this.getContract(KycContract);

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ loaded:true });
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  handleInputChange = (event) => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]:value
    });
  }

  handleWhiteListing = async() => {
    await this.kycContract.methods.setKycCompleted(this.state.kycAddress).send({from: this.accounts[0]});
    alert("KYC for "+this.state.kycAddress+" Completed");
  }

  render() {
    if (!this.state.loaded) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="App">
        <h1>Faith Raisen Token Sale</h1>
        <p>Get your tokens today.</p>
        <h2>Kyc WhiteListing</h2>
        Address to allow: <input type="text" name="kycAddress" value={this.state.kycAddress} onChange={this.handleInputChange} />
        <button type="button" onClick={this.handleWhiteListing}>Add to WhiteList</button>
      </div>
    );
  }
}

export default App;

pragma solidity ^0.7.6;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MyToken is ERC20 {
    constructor(uint256 initialSupply) ERC20("Faith Raisen Token", "FRT") {
        _mint(msg.sender, initialSupply);
    }
}

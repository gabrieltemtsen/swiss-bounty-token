// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract BountyToken is ERC20 {
   

    constructor(uint256 initialSupply) ERC20("BountyToken", "BTO") {
        _mint(msg.sender, initialSupply * (10 ** uint256(decimals())));
    }

      function mint(uint256 amount) public  {
        _mint(msg.sender, amount * (10 ** uint256(decimals())));
    }
}

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Token {
    mapping(address => uint256) public balances;

    constructor(uint256 initialSupply) {
        balances[msg.sender] = initialSupply;
    }

    function transfer(address to, uint256 amount) public {
        require(balances[msg.sender] >= amount, "Not enough balance");
        balances[msg.sender] -= amount;
        balances[to] += amount;
    }
}
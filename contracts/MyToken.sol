// contracts/MyToken.sol
// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MyToken is ERC20{
    address payable public owner;
    constructor() ERC20("Token", "TOK") {
        owner = payable(msg.sender);
        _mint(owner, 100 * 10 ** decimals());
    }

    function transferOwnership(address newOwner)  public  {
        require(msg.sender == owner, "only owner can call this function");
        owner = payable(newOwner);
    }

    function mint(address to, uint256 amount) public {
        require(msg.sender == owner ," only owner can mint token");
        _mint(to, amount* 10 ** decimals());
    }
}
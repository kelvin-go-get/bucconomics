pragma solidity ^0.8.18;
contract Savings {
    mapping(address => uint) public balances;
    function deposit() public payable {
        balances[msg.sender] += msg.value;
    }
    function withdraw(uint amount) public {
        require(balances[msg.sender] >= amount);
        balances[msg.sender] -= amount;
        payable(msg.sender).transfer(amount);
    }
    function getBalance(address user) public view returns (uint) {
        return balances[user];
    }
}
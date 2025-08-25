pragma solidity ^0.8.18;
contract VotingDAO {
    struct Proposal {
        string description;
        uint voteCount;
    }
    Proposal[] public proposals;

    function createProposal(string memory desc) public {
        proposals.push(Proposal(desc, 0));
    }
    function vote(uint index) public {
        proposals[index].voteCount++;
    }
}
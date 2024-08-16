// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract LearnToEarn {
    address public owner;
    mapping(address => uint256) public nonces;
    address public authorizedSigner;

    event RewardClaimed(address indexed user, uint256 reward);

    constructor(address _authorizedSigner) {
        owner = msg.sender;
        authorizedSigner = _authorizedSigner;
    }

    function claimReward(
        address user,
        uint256 rewardAmount,
        uint256 nonce,
        uint256 expiration,
        uint8 v,
        bytes32 r,
        bytes32 s
    ) public {
        require(block.timestamp < expiration, "Signature expired");
        require(nonces[user] < nonce, "Invalid nonce");

        bytes32 message = keccak256(abi.encodePacked(user, rewardAmount, nonce, expiration));
        bytes32 prefixedHash = keccak256(abi.encodePacked("\x19Ethereum Signed Message:\n32", message));

        address signer = ecrecover(prefixedHash, v, r, s);
        require(signer == authorizedSigner, "Invalid signature");

        nonces[user] = nonce;

        emit RewardClaimed(user, rewardAmount);
        // Transfer the reward
    }

    function setAuthorizedSigner(address _authorizedSigner) public {
        require(msg.sender == owner, "Only owner can set authorized signer");
        authorizedSigner = _authorizedSigner;
    }
}

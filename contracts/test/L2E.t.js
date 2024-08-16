const { expect } = require("chai");
const hre = require("hardhat");
const {
	loadFixture,
} = require("@nomicfoundation/hardhat-toolbox/network-helpers");

describe("LearnToEarn", function () {
	let LearnToEarn;
	let learnToEarn;
	let owner;
	let user;
	let authorizedSigner;

	beforeEach(async function () {
		[owner, user] = await ethers.getSigners();

		// Create a new wallet for the authorized signer
		authorizedSigner = ethers.Wallet.createRandom();
		LearnToEarn = await ethers.getContractFactory("LearnToEarn");
		learnToEarn = await LearnToEarn.deploy(authorizedSigner.address);
	});

	it("should allow claiming reward with valid signature", async function () {
		const rewardAmount = 10;
		const nonce = Date.now();
		const expiration = Math.floor(Date.now() / 1000) + 3600;

		// Create the message hash
		const messageHash = ethers.solidityPackedKeccak256(
			["address", "uint256", "uint256", "uint256"],
			[user.address, rewardAmount, nonce, expiration]
		);

		// Sign the message hash
		const signature = await authorizedSigner.signMessage(
			ethers.getBytes(messageHash)
		);
		const { v, r, s } = ethers.Signature.from(signature);

		// Claim reward
		await expect(
			learnToEarn
				.connect(user)
				.claimReward(user.address, rewardAmount, nonce, expiration, v, r, s)
		)
			.to.emit(learnToEarn, "RewardClaimed")
			.withArgs(user.address, rewardAmount);
	});

	it("should reject claim with invalid signature", async function () {
		const rewardAmount = 10;
		const nonce = Date.now();
		const expiration = Math.floor(Date.now() / 1000) + 3600;

		// Create the message hash
		const messageHash = ethers.solidityPackedKeccak256(
			["address", "uint256", "uint256", "uint256"],
			[user.address, rewardAmount, nonce, expiration]
		);

		// Sign the message hash with a different key
		const randomWallet = ethers.Wallet.createRandom();
		const signature = await randomWallet.signMessage(
			ethers.getBytes(messageHash)
		);
		const { v, r, s } = ethers.Signature.from(signature);

		// Try to claim reward
		await expect(
			learnToEarn
				.connect(user)
				.claimReward(user.address, rewardAmount, nonce, expiration, v, r, s)
		).to.be.revertedWith("Invalid signature");
	});

	it("should reject claim with invalid nonce", async function () {
		const rewardAmount = 10;
		const nonce = 0;
		const expiration = Math.floor(Date.now() / 1000) + 3600;

		// Create the message hash
		const messageHash = ethers.solidityPackedKeccak256(
			["address", "uint256", "uint256", "uint256"],
			[user.address, rewardAmount, nonce, expiration]
		);

		// Sign the message hash with a different key
		const randomWallet = ethers.Wallet.createRandom();
		const signature = await randomWallet.signMessage(
			ethers.getBytes(messageHash)
		);
		const { v, r, s } = ethers.Signature.from(signature);

		// Try to claim reward
		await expect(
			learnToEarn
				.connect(user)
				.claimReward(user.address, rewardAmount, nonce, expiration, v, r, s)
		).to.be.revertedWith("Invalid nonce");
	});

	it("should reject claim with Signature expired", async function () {
		const rewardAmount = 10;
		const nonce = 0;
		const expiration = Math.floor(Date.now() / 1000) - 3600;

		// Create the message hash
		const messageHash = ethers.solidityPackedKeccak256(
			["address", "uint256", "uint256", "uint256"],
			[user.address, rewardAmount, nonce, expiration]
		);

		// Sign the message hash with a different key
		const randomWallet = ethers.Wallet.createRandom();
		const signature = await randomWallet.signMessage(
			ethers.getBytes(messageHash)
		);
		const { v, r, s } = ethers.Signature.from(signature);

		// Try to claim reward
		await expect(
			learnToEarn
				.connect(user)
				.claimReward(user.address, rewardAmount, nonce, expiration, v, r, s)
		).to.be.revertedWith("Signature expired");
	});
});

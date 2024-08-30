import hre from 'hardhat';
import { ethers } from 'hardhat';

async function main() {
	const [owner] = await ethers.getSigners();

	const USDT = await hre.ethers.getContractFactory('USDT');
	const totalSupply = '1' + new Array(25).fill('0').join('');
	const usdtContract = await USDT.deploy(totalSupply);
	await usdtContract.waitForDeployment();
	const usdtAddress = await usdtContract.getAddress();
	console.log(usdtAddress);
}

main().catch((error) => {
	console.error(error);
	process.exitCode = 1;
});

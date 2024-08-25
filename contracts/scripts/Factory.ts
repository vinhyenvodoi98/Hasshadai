import hre from 'hardhat';
import { ethers } from 'hardhat';

async function main() {
	const [owner] = await ethers.getSigners();

	const USDT = await hre.ethers.getContractFactory('USDT');
	const usdtContract = await USDT.deploy(10 ** 15);
	await usdtContract.waitForDeployment();
	const usdtAddress = await usdtContract.getAddress();

	const SeedifyLaunchpadERC20 = await hre.ethers.getContractFactory(
		'SeedifyLaunchpadERC20'
	);
	// deploy the implementation contract
	const implementationContract = await SeedifyLaunchpadERC20.deploy();
	await implementationContract.waitForDeployment();
	const implementationAddress = await implementationContract.getAddress();

	console.log('Implementation contract ', implementationAddress);

	const MinimalProxyFactory = await hre.ethers.getContractFactory(
		'MinimalProxyFactory'
	);
	// deploy the minimal factory contract
	const minimalProxyFactory = await MinimalProxyFactory.deploy(
		implementationAddress
	);
	await minimalProxyFactory.waitForDeployment();
	const minimalProxyAddress = await minimalProxyFactory.getAddress();

	console.log('Minimal proxy factory contract ', minimalProxyAddress);
	console.log(
		'Check implementationContract',
		await minimalProxyFactory.implementationContract()
	);

	// call the deploy clone function on the minimal factory contract and pass parameters
	const deployCloneContract = await minimalProxyFactory.deployClone(
		'hasshaai',
		100000,
		Date.now() + 10,
		Date.now() + 4 * 24 * 60 * 60 * 1000,
		3,
		owner,
		usdtAddress,
		1000,
		1
	);
	deployCloneContract.wait();

	// get deployed proxy address
	const ProxyAddress = await minimalProxyFactory.proxies(0);
	console.log('Proxy contract ', ProxyAddress);

	// load the clone
	const proxy = await hre.ethers.getContractAt(
		'ImplementationContract',
		ProxyAddress
	);

	console.log('Proxy is initialized == ', await proxy.isInitialized()); // get initialized boolean == true
}

main().catch((error) => {
	console.error(error);
	process.exitCode = 1;
});


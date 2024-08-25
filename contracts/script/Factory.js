const hre = require('hardhat');

async function main() {
	const SeedifyLaunchpadBUSD = await hre.ethers.getContractFactory(
		'SeedifyLaunchpadBUSD'
	);
	// deploy the implementation contract
	const implementationContract = await SeedifyLaunchpadBUSD.deploy();
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
		'seedify',
		100,
		Date.now() + 10,
		Date.now() + 100,
		3,
		implementationAddress,
		minimalProxyAddress,
		10,
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

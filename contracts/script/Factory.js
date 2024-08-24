const hre = require('hardhat');

async function main() {
	const ImplementationContract = await hre.ethers.getContractFactory(
		'ImplementationContract'
	);
	// deploy the implementation contract
	const implementationContract = await ImplementationContract.deploy();
	await implementationContract.deployed();

	console.log('Implementation contract ', implementationContract.address);

	const MinimalProxyFactory = await hre.ethers.getContractFactory(
		'MinimalProxyFactory'
	);
	// deploy the minimal factory contract
	const minimalProxyFactory = await MinimalProxyFactory.deploy();
	await minimalProxyFactory.deployed();

	console.log('Minimal proxy factory contract ', minimalProxyFactory.address);

	// call the deploy clone function on the minimal factory contract and pass parameters
	const deployCloneContract = await minimalProxyFactory.deployClone(
		implementationContract.address
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

import hre from 'hardhat';
import { ethers } from 'hardhat';

async function main() {
	const [owner] = await ethers.getSigners();

	// const USDT = await hre.ethers.getContractFactory('USDT');
	// const usdtContract = await USDT.deploy(10 ** 15);
	// await usdtContract.waitForDeployment();
	// const usdtAddress = await usdtContract.getAddress();
	const usdtAddress = '0x3cee79798A2436b26Baf090117156b42EE7c2cad';

	const LaunchpadERC20 = await hre.ethers.getContractFactory('LaunchpadERC20');
	// deploy the implementation contract
	const implementationContract = await LaunchpadERC20.deploy();
	await implementationContract.waitForDeployment();
	const implementationAddress = await implementationContract.getAddress();

	console.log('Implementation contract ', implementationAddress);

	const LaunchpadFactory = await hre.ethers.getContractFactory(
		'LaunchpadFactory'
	);
	// deploy the minimal factory contract
	const launchpadFactory = await LaunchpadFactory.deploy(implementationAddress);
	await launchpadFactory.waitForDeployment();
	const minimalProxyAddress = await launchpadFactory.getAddress();

	console.log('Minimal proxy factory contract ', minimalProxyAddress);
	console.log(
		'Check implementationContract',
		await launchpadFactory.implementationContract()
	);

	// call the deploy clone function on the minimal factory contract and pass parameters
	const deployCloneContract = await launchpadFactory.deployClone(
		'hasshaai',
		100000,
		Date.now() + 10,
		Date.now() + 4 * 24 * 60 * 60 * 1000,
		3,
		owner,
		usdtAddress,
		1
	);
	const receipt = await deployCloneContract.wait();

	if ('args' in receipt!.logs[0]) {
		console.log((receipt!.logs[0] as any).args);
	} else {
		console.log('No args property found in the log');
	}

	// get deployed proxy address
	const proxyAddress = await launchpadFactory.allLaunchpads(0);
	console.log('Proxy contract ', proxyAddress);

	// load the clone
	const proxy = await hre.ethers.getContractAt('LaunchpadERC20', proxyAddress);

	console.log('Proxy is initialized == ', await proxy.isInitialized()); // get initialized boolean == true
}

main().catch((error) => {
	console.error(error);
	process.exitCode = 1;
});
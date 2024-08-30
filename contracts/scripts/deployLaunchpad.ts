import { log } from 'console';
import hre from 'hardhat';
import { ethers } from 'hardhat';

async function updateImplementation() {
	const LaunchpadERC20 = await hre.ethers.getContractFactory('LaunchpadERC20');
	// deploy the implementation contract
	const implementationContract = await LaunchpadERC20.deploy();
	await implementationContract.waitForDeployment();
	const implementationAddress = await implementationContract.getAddress();
	console.log('Implementation contract ', implementationAddress);
	return implementationAddress;
}

async function deployLaunchpad() {
	const [owner] = await ethers.getSigners();
	const factoryAddress = '0x852E8f3777e39800be22E7581516c94641eBbE4D';
	const launchpadFactory = await ethers.getContractAt(
		'LaunchpadFactory',
		factoryAddress
	);

	const usdtAddress = '0xb1ac5211a7742960857DA6f32c479849AAF8eaa6';

	// const implementationAddress = await updateImplementation();
	// await launchpadFactory.updateImplementation(implementationAddress);
	// console.log(
	// 	'Check implementationContract',
	// 	await launchpadFactory.implementationContract()
	// );

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
	let launchpadAddress;
	if ('args' in receipt!.logs[1]) {
		console.log((receipt!.logs[1] as any).args);
		launchpadAddress = (receipt!.logs[1] as any).args[0];
	} else {
		console.log('No args property found in the log');
	}
	const launchpad = await ethers.getContractAt(
		'LaunchpadERC20',
		launchpadAddress
	);
	console.log('Launchpad owner ', await launchpad.owner());
}

async function readLaunchpad() {
	const [owner] = await ethers.getSigners();

	const usdtAddress = '0xb1ac5211a7742960857DA6f32c479849AAF8eaa6';

	let factoryAddress = '0xec462068a2C126c5577bF985C1D255b8143792Ad';
	const launchpadFactory = await ethers.getContractAt(
		'LaunchpadFactory',
		factoryAddress
	);
	log('implementationContract', await launchpadFactory.implementationContract());
	log('length', await launchpadFactory.getAllLaunchpadsLength());
	// get deployed proxy address
	const proxyAddress = await launchpadFactory.allLaunchpads(0);
	console.log('Proxy contract ', proxyAddress);

	const proxy = await hre.ethers.getContractAt('LaunchpadERC20', proxyAddress);
	console.log('Launchpad owner ', await proxy.owner()); // get initialized boolean == true
}
readLaunchpad().catch((error) => {
	console.error(error);
	process.exitCode = 1;
});
npx hardhat verify --network opencampus 0xec462068a2C126c5577bF985C1D255b8143792Ad  "0x68bb01404ab9B2Ce073215DD597186eBd776E2b7"
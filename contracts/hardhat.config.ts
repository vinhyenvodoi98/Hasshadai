import { HardhatUserConfig } from 'hardhat/config';
import '@nomicfoundation/hardhat-toolbox';

const config: HardhatUserConfig = {
	solidity: '0.8.24',
	paths: {
		sources: './src',
		tests: './test',
		cache: './cache',
		artifacts: './artifacts',
	},
};

export default config;

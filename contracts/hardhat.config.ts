import { HardhatUserConfig } from 'hardhat/config';
import '@nomicfoundation/hardhat-toolbox';
import * as dotenv from 'dotenv';

dotenv.config({ path: __dirname + '/../.env' });
const ACCOUNT_PRIVATE_KEY = process.env.ACCOUNT_PRIVATE_KEY || '';
console.log('PrivateKey set:', !!ACCOUNT_PRIVATE_KEY);

const config: HardhatUserConfig = {
	solidity: '0.8.24',
	paths: {
		sources: './src',
		tests: './test',
		cache: './cache',
		artifacts: './artifacts',
	},
	networks: {
		opencampus: {
			url: `https://rpc.open-campus-codex.gelato.digital/`,
			accounts: [process.env.ACCOUNT_PRIVATE_KEY!],
		},
	},
	etherscan: {
		apiKey: {
			opencampus: 'your-etherscan-api-key',
		},
		customChains: [
			{
				network: 'opencampus',
				chainId: 656476,
				urls: {
					apiURL: 'https://opencampus-codex.blockscout.com/api',
					browserURL: 'https://opencampus-codex.blockscout.com',
				},
			},
		],
	},
};

export default config;

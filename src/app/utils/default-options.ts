import {
	custom,
	erc1155,
	erc20,
	erc721,
	governor,
	infoDefaults,
	Kind,
	KindedOptions,
} from '@openzeppelin/wizard';

const defaultAllOpts: {
	[k in Kind]: Required<KindedOptions[k]>;
} = {
	ERC20: {
		kind: 'ERC20',
		...erc20.defaults,
		premint: '', // default to empty premint in UI instead of 0
		info: { ...infoDefaults }, // create new object since Info is nested
	},
	ERC721: {
		kind: 'ERC721',
		...erc721.defaults,
		info: { ...infoDefaults }, // create new object since Info is nested
	},
	ERC1155: {
		kind: 'ERC1155',
		...erc1155.defaults,
		info: { ...infoDefaults }, // create new object since Info is nested
	},
	Governor: {
		kind: 'Governor',
		...governor.defaults,
		proposalThreshold: '', // default to empty in UI
		quorumAbsolute: '', // default to empty in UI
		info: { ...infoDefaults }, // create new object since Info is nested
	},
	Custom: {
		kind: 'Custom',
		...custom.defaults,
		info: { ...infoDefaults }, // create new object since Info is nested
	},
};

export default defaultAllOpts;

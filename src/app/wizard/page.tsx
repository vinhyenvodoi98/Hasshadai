'use client';

import './page.css';
import type {
	KindedOptions,
	Kind,
	Contract,
	OptionsErrorMessages,
} from '@openzeppelin/wizard';
import {
	ContractBuilder,
	buildGeneric,
	printContract,
	sanitizeKind,
	OptionsError,
	erc20,
	infoDefaults,
	erc721,
} from '@openzeppelin/wizard';
import { postConfig } from '../utils/post-config';
import { remixURL } from '../utils/remix';
import { saveAs } from 'file-saver';
import { injectHyperlinks } from '../utils/inject-hyperlinks';
import hljs from '../utils/highlightjs';
import React, { FC, useState, useEffect } from 'react';
import ERC20Controls from './components/ERC20Controls';
import defaultAllOpts from '../utils/default-options';
import ERC1155Controls from './components/ERC1155Controls';
import ERC721Controls from './components/ERC721Controls';
import CustomControls from './components/CustomControls';
import GovernorControls from './components/GovernorControls';

let initialTab: string | undefined = 'ERC20';
const language = 'solidity';

const Wizard: FC = () => {
	const [tab, setTab] = useState(sanitizeKind(initialTab));
	const [allOpts, setAllOpts] = useState<{
		[k in Kind]: Required<KindedOptions[k]>;
	}>(defaultAllOpts);
	const [errors, setErrors] = useState<{ [k in Kind]?: OptionsErrorMessages }>(
		{}
	);
	const [contract, setContract] = useState<Contract>(
		new ContractBuilder('MyToken')
	);
	const [opts, setOpts] = useState<Required<KindedOptions[Kind]> | undefined>(
		undefined
	);
	const [code, setCode] = useState('');
	const [highlightedCode, setHighlightedCode] = useState('');
	const [copied, setCopied] = useState(false);

	const dispatch = (event: string, detail: any) => {
		// Implement your dispatch function
		// console.log(event, detail);
	};

	useEffect(() => {
		const sanitizedTab = sanitizeKind(tab);
		setTab(sanitizedTab);
		dispatch('tab-change', sanitizedTab);
	}, [tab]);

	useEffect(() => {
		setOpts(allOpts[tab]);
	}, [tab, allOpts]);

	useEffect(() => {
		if (opts) {
			try {
				const newContract = buildGeneric(opts);
				setContract(newContract);
				setErrors((prevErrors) => ({ ...prevErrors, [tab]: undefined }));
			} catch (e) {
				if (e instanceof OptionsError) {
					setErrors((prevErrors) => ({ ...prevErrors, [tab]: e.messages }));
				} else {
					throw e;
				}
			}
		}
	}, [opts, tab]);

	useEffect(() => {
		setCode(printContract(contract));
	}, [contract]);

	useEffect(() => {
		setHighlightedCode(
			injectHyperlinks(hljs.highlight(code, { language }).value)
		);
	}, [code]);

	const nameMap = {
		erc20: 'ERC20',
		erc721: 'ERC721',
		erc1155: 'ERC1155',
		governor: 'Governor',
		custom: 'Custom',
	};

	let functionCall: {
		name?: string;
		opts?: any;
	} = {};

	const applyFunctionCall = () => {
		if (functionCall.name) {
			const name = functionCall.name as keyof typeof nameMap;
			setTab(sanitizeKind(nameMap[name]));

			allOpts[tab] = {
				...allOpts[tab],
				...functionCall.opts,
			};
		}
	};
	useEffect(() => {
		if (functionCall.name) {
			const name = functionCall.name as keyof typeof nameMap;
			const newTab = sanitizeKind(nameMap[name]);
			setTab(newTab);

			setAllOpts((prevOpts) => ({
				...prevOpts,
				[newTab]: {
					...prevOpts[newTab],
					...functionCall.opts,
				},
			}));
		}
	}, [functionCall]);

	useEffect(() => {
		applyFunctionCall();
	}, [functionCall, applyFunctionCall]);

	const copyHandler = async () => {
		await navigator.clipboard.writeText(code);
		setCopied(true);
		if (opts) {
			await postConfig(opts, 'copy', language);
		}
		setTimeout(() => {
			setCopied(false);
		}, 1000);
	};

	// const remixHandler = async (e: React.MouseEvent) => {
	// 	e.preventDefault();
	// 	if ((e.target as Element)?.classList.contains("disabled")) return;

	// 	const { printContractVersioned } = await import(
	// 		"@openzeppelin/wizard/src/print-versioned"
	// 	);
	// 	const versionedCode = printContractVersioned(contract);
	// 	window.open(
	// 		remixURL(versionedCode, !!opts?.upgradeable).toString(),
	// 		"_blank",
	// 		"noopener,noreferrer"
	// 	);
	// 	if (opts) {
	// 		await postConfig(opts, "remix", language);
	// 	}
	// };

	const downloadNpmHandler = async () => {
		const blob = new Blob([code], { type: 'text/plain' });
		if (opts) {
			saveAs(blob, opts.name + '.sol');
			await postConfig(opts, 'download-npm', language);
		}
	};
	// const downloadHardhatHandler = async () => {
	// 	const { zipHardhat } = await import(
	// 		"@openzeppelin/wizard/src/zip-hardhat"
	// 	);
	// 	const zip = await zipHardhat(contract, opts);
	// 	const blob = await zip.generateAsync({ type: "blob" });
	// 	saveAs(blob, "project.zip");
	// 	if (opts) {
	// 		await postConfig(opts, "download-hardhat", language);
	// 	}
	// };

	// const downloadFoundryHandler = async () => {
	// 	const { zipFoundry } = await import(
	// 		"@openzeppelin/wizard/dist/zip-foundry"
	// 	);
	// 	const zip = await zipFoundry(contract, opts);
	// 	const blob = await zip.generateAsync({ type: "blob" });
	// 	saveAs(blob, "project.zip");
	// 	if (opts) {
	// 		await postConfig(opts, "download-foundry", language);
	// 	}
	// };

	return (
		<div className="flex flex-col p-4 bg-base-200 min-h-screen">
			{/* Top Navigation Buttons */}
			<div className="flex space-x-2 mb-4">
				{['ERC20', 'ERC721', 'ERC1155', 'Governor', 'Custom'].map((tabName) => (
					<button
						key={tabName}
						className={`btn ${tab === tabName ? 'btn-primary' : 'btn-outline'}`}
						onClick={() => setTab(tabName as Kind)}
					>
						{tabName}
					</button>
				))}
			</div>

			<div className="flex flex-col md:flex-row">
				{/* Sidebar */}
				{tab === 'ERC20' ? (
					<ERC20Controls opts={allOpts.ERC20} setAllOpts={setAllOpts} />
				) : tab === 'ERC721' ? (
					<ERC721Controls opts={allOpts.ERC721} setAllOpts={setAllOpts} />
				) : tab === 'ERC1155' ? (
					<ERC1155Controls opts={allOpts.ERC1155} setAllOpts={setAllOpts} />
				) : tab === 'Governor' ? (
					<GovernorControls opts={allOpts.Governor} setAllOpts={setAllOpts} errors={errors.Governor}/>
				) : (
					<CustomControls opts={allOpts.Custom} setAllOpts={setAllOpts} />
				)}

				{/* Code Editor */}
				<div className="bg-base-100 p-4 rounded-lg shadow-md w-full md:w-3/4 mt-4 md:mt-0 md:ml-4 flex flex-col">
					<div className="flex justify-between items-center mb-4">
						<h2 className="text-xl font-bold">Code</h2>
						{/* <button className="btn btn-primary">Deploy with Defender</button> */}
						<button className="btn" onClick={copyHandler}>
							{copied ? 'Copied' : 'Copy to Clipboard'}
						</button>
					</div>
					<div className="output flex flex-col grow overflow-auto flex-1">
						<pre className="flex flex-col grow basis-0 overflow-auto">
							<code
								className="hljs grow overflow-auto p-4"
								dangerouslySetInnerHTML={{ __html: highlightedCode }}
							/>
						</pre>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Wizard;

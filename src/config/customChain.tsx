import { Chain } from "@rainbow-me/rainbowkit";

export const eduChainTestnet = {
  id: 656476,
  name: "Edu Chain Testnet",
  network: "educhain",
  iconUrl: "/svg/eduLogo.svg",
  iconBackground: "#000",
  nativeCurrency: {
    decimals: 18,
    name: "Ether",
    symbol: "ETH",
  },
  rpcUrls: {
    public: { http: ["https://rpc.open-campus-codex.gelato.digital"] },
    default: { http: ["https://rpc.open-campus-codex.gelato.digital"] },
  },
  blockExplorers: {
    etherscan: {
      name: "Blockscout",
      url: "https://opencampus-codex.blockscout.com/",
    },
    default: {
      name: "Blockscount",
      url: "https://opencampus-codex.blockscout.com/",
    },
  },
  testnet: true,
} as Chain;
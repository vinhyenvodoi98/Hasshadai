"use client";
import { wagmiConfig } from "@/config/wagmiConfig";
import {
  darkTheme,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import {
  QueryClientProvider,
  QueryClient,
} from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import { OCConnect } from '@opencampus/ocid-connect-js';

const queryClient = new QueryClient();

const opts = {
  redirectUri: 'http://localhost:3000/redirect',
}

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <OCConnect opts={opts} sandboxMode={true}>
      <WagmiProvider config={wagmiConfig}>
        <QueryClientProvider client={queryClient}>
          <RainbowKitProvider coolMode theme={darkTheme()}>
            {children}
          </RainbowKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </OCConnect>
  );
}
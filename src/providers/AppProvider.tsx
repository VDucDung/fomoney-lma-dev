"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import SolanaWalletProvider from "./SolanaWalletProvider";

// Create a client
const queryClient = new QueryClient();

export default function AppProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <QueryClientProvider client={queryClient}>
      <SolanaWalletProvider>{children}</SolanaWalletProvider>
    </QueryClientProvider>
  );
}

"use client";

import { Navbar } from "@/components/ui/navbar";
import { AuthProvider } from "@/context/provider/authprovider";
import { ChatProvider } from "@/context/provider/chatprovider";
import MusicContextProvider from "@/context/provider/musiccontext";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <ChatProvider>
        <MusicContextProvider>
          <main>
            <Navbar />
            {children}
          </main>
        </MusicContextProvider>
      </ChatProvider>
    </AuthProvider>
  );
}

"use client";

import { Navbar } from "@/components/ui/navbar";
import { AuthProvider } from "@/context/provider/authprovider";
import MusicContextProvider from "@/context/provider/musiccontext";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <MusicContextProvider>
        <main>
          <Navbar />
          {children}
        </main>
      </MusicContextProvider>
    </AuthProvider>
  );
}

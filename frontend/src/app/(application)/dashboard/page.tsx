"use client";
import MusicPlayer from "@/components/musicplayer";
import { useTheme } from "next-themes";
import ChatComponent from "@/components/chat";
import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import { BACKEND_URL, TrackType } from "@/config/config";
import Loader from "./loader";
import ListView from "@/components/listview";
import { useMusicContext } from "@/context/provider/musiccontext";
import { set } from "firebase/database";
import { IconBubbleText } from "@tabler/icons-react";
import { MusicIcon } from "lucide-react";

export default function Home() {
  // const [tracks, setTracks] = useState<TrackType[] | null>(null);
  // const [error, setError] = useState("")
  const { tracks, currentTrack, setCurrenTrack, error } = useMusicContext();
  const [tab, setTab] = useState<"chat" | "list">("chat");

  if (!tracks && !error) {
    return <Loader />;
  }

  if (error || !tracks || !currentTrack) {
    return (
      <div className="flex justify-center items-center text-red-500 text-2xl mt-10">
        {error}
      </div>
    );
  }

  return (
    <main className={`bg-background`}>
      <div className="mx-auto px-4 py-6 flex flex-col max-w-7xl">
        <div className="relative flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-5 h-full">
            <MusicPlayer tracks={tracks} currentTrack={currentTrack} />
          </div>
          <div className="lg:col-span-7 h-full">
            <div className="absolute -top-4 right-0 grid grid-cols-2 z-10 border overflow-hidden border-border bg-card rounded-[12px] w-40 h-10">
              <div className="flex justify-center items-center gap-2 cursor-pointer hover:bg-accent p-2 w-full" onClick={() => setTab("chat")}>
                <IconBubbleText className="h-4 w-4" /> <span>Chat</span>
              </div>
              <div className="flex justify-center items-center gap-2 cursor-pointer hover:bg-accent p-2 w-full" onClick={() => setTab("list")}>
                  <MusicIcon className="w-4 h-4" /> <span>List</span>
              </div>
            </div>
          {tab === "chat" ? (
            <div >
              <ChatComponent />
            </div>
          ) : (
            <div className="h-full">
              <ListView tracks={tracks} setCurrenTrack={setCurrenTrack} />
            </div>
          )}
          </div>
        </div>
      </div>
    </main>
  );
}

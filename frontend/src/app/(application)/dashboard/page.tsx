"use client";
import MusicPlayer from "@/components/musicplayer";
import ChatComponent from "@/components/chat";
import { Dispatch, MouseEvent, MouseEventHandler, SetStateAction, useCallback, useMemo, useRef, useState } from "react";
import Loader from "./loader";
import ListView from "@/components/listview";
import { useMusicContext } from "@/context/provider/musiccontext";
import { IconBubbleText } from "@tabler/icons-react";
import { MusicIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function Home() {
  const { tracks, currentTrack, setCurrenTrack, error } = useMusicContext();
  const [tab, setTab] = useState<"chat" | "list">("chat");
  const [openModel, setModelOpen] = useState(false);

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
    <main className={`bg-background max-w-4xl max-auto md:max-w-full`}>
      <div className="mx-auto px-4 py-6 flex flex-col max-w-7xl">
        <div className="relative flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-5 h-full">
            <MusicPlayer
              tracks={tracks}
              currentTrack={currentTrack}
              setCurrentTrack={setCurrenTrack}
            />
          </div>
          <div className="lg:col-span-7 h-full">
            <div className="absolute -top-4 right-0 grid grid-cols-2 z-10 border overflow-hidden border-border bg-card rounded-[12px] w-40 h-10">
              <div
                className="flex justify-center items-center gap-2 cursor-pointer hover:bg-accent p-2 w-full"
                onClick={() => setTab("chat")}
              >
                <IconBubbleText className="h-4 w-4" /> <span>Chat</span>
              </div>
              <div
                className="flex justify-center items-center gap-2 cursor-pointer hover:bg-accent p-2 w-full"
                onClick={() => setTab("list")}
              >
                <MusicIcon className="w-4 h-4" /> <span>List</span>
              </div>
            </div>
            {tab === "chat" ? (
              <div>
                <ChatComponent />
              </div>
            ) : (
              <div className="h-full">
                <ListView tracks={tracks} setModelOpen={setModelOpen} setCurrenTrack={setCurrenTrack} />
              </div>
            )}
          </div>
          {openModel && <Model setModelOpen={setModelOpen} />}
        </div>
      </div>
    </main>
  );
}

function Model({
  setModelOpen
} : {
  setModelOpen : Dispatch<SetStateAction<boolean>>
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const handleClickOuside = (e : MouseEvent<HTMLDivElement, globalThis.MouseEvent>) => {
    const element = containerRef.current;

    const elementRect = element?.getBoundingClientRect();

  }

  return (
    <div className="w-1/2 absolute z-10 left-60 top-10" ref={containerRef} onMouseDown={(e) => handleClickOuside(e)}>
      <div className="flex flex-col justify-center items-center gap-4 border border-border rounded-[12px] p-10 bg-accent w-full">

        <div className="flex justify-center items-center font-inter text-4xl font-bold">
          <h1>Add Music</h1>
        </div>
        <div className="w-full flex flex-col justify-center gap-2">
          <Label>Music File</Label>
          <Input type="file" content="/mp3" />
        </div>
        <div className="w-full flex flex-col justify-center gap-2">
          <Label>Name</Label>
          <Input type="text" placeholder="Enter Name of the file" />
        </div>
        <div className="w-full flex flex-col justify-center gap-2">
          <Label>Description</Label>
          <textarea className="p-2 border border-border" placeholder="Enter Name of the file" />
        </div>
        <div className="w-full flex flex-col justify-center gap-2">
          <Label>Image</Label>
          <Input type="file" />
        </div>

        <div className="w-full flex flex-col justify-center gap-2">
          <Button className="cursor-pointer">Submit</Button>
        </div>
      </div>
    </div>
  );
}

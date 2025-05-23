"use client"
import MusicPlayer from "@/components/musicplayer"
import { useTheme } from "next-themes"
import ChatComponent from "@/components/chat"
import { useEffect, useState } from "react"
import axios, { AxiosError } from "axios"
import { BACKEND_URL, TrackType } from "@/config/config"
import Loader from "./loader"


export default function Home() {

  const [tracks, setTracks] = useState<TrackType[] | null>(null);
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchTracks = async () => {
      try {

        const abortController = new AbortController();
        const response = await axios.get(`${BACKEND_URL}/api/v1/songs`)
        console.log(response.data)

        const data = response.data.songs;

        console.log(data)
        setTracks(data)
      } catch (e : any) {
          console.log(e);
          //  const axioserror = e as AxiosError;
          setError(e.message)
      }
    }
    fetchTracks()
  }, [])


  if(!tracks && !error){
    return (
          <Loader />
    )
  }

  if(error || !tracks){
    return (
      <div className="flex justify-center items-center text-red-500 text-2xl mt-10">
        {error}
      </div>
    )
  }

  return (
    <main className={`bg-background`}>
      <div className="mx-auto px-4 py-6 flex flex-col max-w-7xl">
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-5 h-full">
            <MusicPlayer tracks={tracks} />
          </div>

          {/* <div className="lg:col-span-7 h-full">
            <ChatComponent />
          </div> */}
        </div>
      </div>
    </main>
  )
}


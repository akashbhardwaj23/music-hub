"use client"
import { BACKEND_URL, TrackType } from "@/config/config";
import axios from "axios";
import { createContext, Dispatch, SetStateAction, useContext, useEffect, useState } from "react";



interface MusicContextType {
    tracks : TrackType[] | undefined,
    setTracks : Dispatch<SetStateAction<TrackType[] | undefined>>,
    error : string,
    setError : Dispatch<SetStateAction<string>>,
    currentTrack : TrackType | undefined,
    setCurrenTrack : Dispatch<SetStateAction<TrackType | undefined>>
}

const MusicContext = createContext<MusicContextType | null>(null);



export default function MusicContextProvider({
    children
}: {
    children : React.ReactNode
}){
    const [tracks, setTracks] = useState<TrackType[] | undefined>();
    const [error, setError] = useState('')
    const [currentTrack, setCurrenTrack] = useState<TrackType | undefined>();


    useEffect(() => {
        const fetchTracks = async () => {
            try {
      
              const abortController = new AbortController();
              const response = await axios.get(`${BACKEND_URL}/api/v1/songs`)
              console.log(response.data)
      
              const data:TrackType[] = response.data.songs;
              const current = data[0];
              console.log(data)
              setTracks(data)
              setCurrenTrack(current)
            } catch (e : any) {
                console.log(e);
                //  const axioserror = e as AxiosError;
                setError(e.message)
            }
          }
          fetchTracks()
    }, [])

    return (
        <MusicContext.Provider value={{tracks, setTracks, error, setError, currentTrack, setCurrenTrack}}>
            {children}
        </MusicContext.Provider>
    )
}


export function useMusicContext(){
    const context = useContext(MusicContext);

    if(!context){
        throw Error("No Context Provided")
    }


    return context
}

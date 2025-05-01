"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence, useAnimation } from "framer-motion"
import { Play, Pause, SkipBack, SkipForward, Volume2, Heart, Repeat, Shuffle } from "lucide-react"
import { AudioSpectrum } from "@/components/ui-effects/audiospectrum"
import axios from "axios"
import { BACKEND_URL, TrackType } from "@/config/config"

type Track = {
  id: number
  title: string
  artist: string
  album: string
  duration: number
  coverArt: string
  audioSrc: string
  isFavorite: boolean
  genre: string
}



export default function MusicPlayer({
  tracks
} : {
  tracks : TrackType[]
}) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(0.7)
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const visualizerControls = useAnimation()
 


  console.log("Tracks are ", tracks)

  // const tracks: Track[] = [
  //   {
  //     id: 1,
  //     title: "Midnight Echoes",
  //     artist: "Vercel Audio",
  //     album: "Digital Landscapes",
  //     duration: 237,
  //     coverArt: "/globe.svg",
  //     audioSrc: "/music.mp3",
  //     isFavorite: true,
  //     genre: "Ambient",
  //   },
  //   // {
  //   //   id: 2,
  //   //   title: "Static Whispers",
  //   //   artist: "Mono Type",
  //   //   album: "Terminal",
  //   //   duration: 195,
  //   //   coverArt: "/placeholder.svg?height=400&width=400",
  //   //   audioSrc: "/placeholder-audio.mp3",
  //   //   isFavorite: false,
  //   //   genre: "Electronic",
  //   // },
  //   // {
  //   //   id: 3,
  //   //   title: "Digital Rain",
  //   //   artist: "Code Ensemble",
  //   //   album: "Deployment",
  //   //   duration: 218,
  //   //   coverArt: "/placeholder.svg?height=400&width=400",
  //   //   audioSrc: "/placeholder-audio.mp3",
  //   //   isFavorite: true,
  //   //   genre: "Ambient",
  //   // },
  // ]



  // useEffect(() => {
  //   const fetchdata = async () => {
  //     const response = await axios.get(`${BACKEND_URL}//api/v1/songs`);

  //     const data = response.data;
  //   }

  //   fetchdata()
  // }, [])


  const currentTrack = tracks[currentTrackIndex]

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    // update the current time of the playhead at the start and called by the event when the time updates
    const updateTime = () => setCurrentTime(audio.currentTime)
    // update the current duration left called by the event loadedmetadata
    const updateDuration = () => {
      setDuration(audio.duration)
      setIsLoaded(true)
    }

    console.log("Current Time ",currentTime)
    console.log("Current Duration ",duration)


    audio.addEventListener("timeupdate", updateTime)
    audio.addEventListener("loadedmetadata", updateDuration)

    // cleanup function when the effect ran
    return () => {
      console.log("clean up is getting called")
      audio.removeEventListener("timeupdate", updateTime)
      audio.removeEventListener("loadedmetadata", updateDuration)
    }
  }, [isPlaying])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    console.log(audio)

    console.log("Is playing ",isPlaying)
    if (isPlaying) {
      
      audio.play().catch((error) => {
        console.error("Error playing audio:", error)
        setIsPlaying(false)
      })
      // audio visualizer which change 1.5 and it is an animation coming from framer-motion 
      visualizerControls.start({
        opacity: [0.8, 1],
        transition: { duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
      })
    } else {
      audio.pause()
      visualizerControls.stop()
    }
  }, [isPlaying, currentTrackIndex, visualizerControls])

  // seprate because the whole effect will run if change the volume only
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    audio.volume = volume
  }, [volume])

  const formatTime = (time: number) => {
    if (isNaN(time)) return "0:00"

    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
  }

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  const handlePrevTrack = () => {
    setIsLoaded(false)
    setCurrentTrackIndex((prev) => (prev === 0 ? tracks.length - 1 : prev - 1))
  }

  const handleNextTrack = () => {
    setIsLoaded(false)
    setCurrentTrackIndex((prev) => (prev === tracks.length - 1 ? 0 : prev + 1))
  }
// TODO : what is this
  const handleSeek = (value: number[]) => {
    const newTime = value[0]
    setCurrentTime(newTime)
    if (audioRef.current) {
      audioRef.current.currentTime = newTime
    }
  }

  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0]
    setVolume(newVolume)
  }


  return (
    <div className="border border-border bg-card overflow-hidden shadow-sm rounded-md">
      <div className="p-0 h-full flex flex-col">
        <div className="flex-1 overflow-hidden">
          <div className="h-full flex flex-col p-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTrackIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="flex-1 flex flex-col items-center justify-center gap-5 py-2"
              >

                <div className="relative w-full max-w-[220px] aspect-square">
                  <motion.div
                    className="w-full h-full relative"
                    animate={{
                      scale: isPlaying ? [1, 1.02, 1] : 1,
                      transition: {
                        duration: 2,
                        repeat: isPlaying ? Number.POSITIVE_INFINITY : 0,
                        ease: "easeInOut",
                      },
                    }}
                  >
                    <motion.div
                      className="absolute inset-0 overflow-hidden border border-border"
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.2 }}
                    >
                      <img
                        src={currentTrack.songImg || ""}
                        alt={`${currentTrack.songName} by`}
                        className="w-full h-full object-cover"
                      />
                    </motion.div>

                    {/* <motion.div
                      className="absolute -right-2 -bottom-2 z-10"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2, duration: 0.3 }}
                    >
                      <span className="inline-flex items-center rounded-md bg-primary px-2 py-1 text-xs font-medium text-primary-foreground">
                        {currentTrack.genre}
                      </span>
                    </motion.div> */}
                  </motion.div>
                </div>

                <div className="w-full text-center space-y-1">
                  <h2 className="text-xl font-bold text-forground">{currentTrack.songName}</h2>
                  <p className="text-muted-foreground text-sm">
                    {/* {currentTrack.artist} • {currentTrack.album} */}
                    Artist •  Album
                  </p>
                </div>

                <div className="w-full">
                  <AudioSpectrum isPlaying={isPlaying} controls={visualizerControls} />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Music Controller */}
        <div className="p-4 border-t border-border bg-card">
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>{formatTime(currentTime)}</span>
              <span>{isLoaded ? formatTime(duration) : "--:--"}</span>
            </div>

            <div className="relative h-1">
              {isLoaded ? (
                <div className="relative w-full h-1 bg-muted rounded-full">
                  <div
                    className="absolute h-full bg-primary rounded-full"
                    style={{ width: `${(currentTime / duration) * 100}%` }}
                  ></div>
                  <input
                    type="range"
                    min="0"
                    max={duration || 100}
                    step="0.01"
                    value={currentTime}
                    onChange={(e) => handleSeek([Number.parseFloat(e.target.value)])}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                </div>
              ) : (
                <div className="w-full h-1 bg-muted rounded-full overflow-hidden">
                  <motion.div
                    animate={{
                      x: ["-100%", "100%"],
                      opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "linear",
                    }}
                    className="h-full w-1/4 bg-primary/50"
                  />
                </div>
              )}
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <button className="flex items-center justify-center size-8 text-muted-foreground hover:text-forground hover:bg-accent/50 rounded-md">
                  <Shuffle size={16} />
                </button>

                <button className="flex items-center justify-center size-8 text-muted-foreground hover:text-forground hover:bg-accent/50 rounded-md">
                  <Repeat size={16} />
                </button>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={handlePrevTrack}
                  className="flex items-center justify-center size-10 text-forground hover:text-forground hover:bg-accent/50 rounded-md"
                >
                  <SkipBack size={20} />
                </button>

                <motion.div whileTap={{ scale: 0.95 }}>
                  <button
                    onClick={handlePlayPause}
                    className="rounded-full size-12 p-0 bg-primary hover:bg-primary/90 text-primary-foreground flex items-center justify-center"
                  >
                    {isPlaying ? <Pause size={20} /> : <Play size={20} className="ml-1" />}
                  </button>
                </motion.div>

                <button
                  onClick={handleNextTrack}
                  className="flex items-center justify-center size-10 text-forground hover:text-forground hover:bg-accent/50 rounded-md"
                >
                  <SkipForward size={20} />
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button
                  className={`flex items-center justify-center size-8 hover:bg-accent/50 rounded-md ${
                    currentTrack.favorite
                      ? "text-[var(--destructive)]"
                      : "text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
                  }`}
                >
                  <Heart size={16} fill={currentTrack.favorite ? "currentColor" : "none"} />
                </button>

                <div className="flex items-center py-2 gap-1">
                  <Volume2 size={20} className="text-muted-foreground" />
                  <div className="relative w-16 h-1 bg-muted rounded-full">
                    <div
                      className="absolute h-full bg-primary rounded-full"
                      style={{ width: `${volume * 100}%` }}
                    ></div>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.01"
                      value={volume}
                      onChange={(e) => handleVolumeChange([Number.parseFloat(e.target.value)])}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <audio ref={audioRef} src={currentTrack.songurl} onEnded={handleNextTrack} preload="none" />
    </div>
  )
}


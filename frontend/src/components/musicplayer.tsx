"use client"

import { useState, useRef, useEffect } from "react"
import { Play, Pause, SkipBack, SkipForward, Volume2, Volume1, VolumeX, Disc, ExternalLink } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { CardContent } from "@/components/ui/card"
import Link from "next/link"

type Track = {
  id: number
  title: string
  artist: string
  src: string
  videoLink: string
  color: string
  bgColor: string
}

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(0.7)
  const [isMuted, setIsMuted] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const [showVolumeSlider, setShowVolumeSlider] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const volumeControlRef = useRef<HTMLDivElement>(null)

  // Sample tracks
  const tracks: Track[] = [
    {
      id: 1,
      title: "Ocean Waves",
      artist: "Nature Sounds",
      src: "/placeholder-audio.mp3",
      videoLink: "https://example.com/ocean-waves-video",
      color: "from-emerald-500 to-cyan-500",
      bgColor: "from-emerald-950/30 to-cyan-950/30",
    },
    {
      id: 2,
      title: "Forest Ambience",
      artist: "Nature Sounds",
      src: "/placeholder-audio.mp3",
      videoLink: "https://example.com/forest-ambience-video",
      color: "from-teal-500 to-emerald-500",
      bgColor: "from-teal-950/30 to-emerald-950/30",
    },
    {
      id: 3,
      title: "Mountain Echo",
      artist: "Ambient Sounds",
      src: "/placeholder-audio.mp3",
      videoLink: "https://example.com/mountain-echo-video",
      color: "from-cyan-500 to-blue-500",
      bgColor: "from-cyan-950/30 to-blue-950/30",
    },
  ]

  const [currentTrackIndex, setCurrentTrackIndex] = useState(0)
  const currentTrack = tracks[currentTrackIndex]

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const updateTime = () => setCurrentTime(audio.currentTime)
    const updateDuration = () => {
      setDuration(audio.duration)
      setIsLoaded(true)
    }

    audio.addEventListener("timeupdate", updateTime)
    audio.addEventListener("loadedmetadata", updateDuration)

    return () => {
      audio.removeEventListener("timeupdate", updateTime)
      audio.removeEventListener("loadedmetadata", updateDuration)
    }
  }, [])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    if (isPlaying) {
      audio.play().catch((error) => {
        console.error("Error playing audio:", error)
        setIsPlaying(false)
      })
    } else {
      audio.pause()
    }
  }, [isPlaying, currentTrackIndex])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    audio.volume = isMuted ? 0 : volume
  }, [volume, isMuted])

  // Handle clicks outside volume slider
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (volumeControlRef.current && !volumeControlRef.current.contains(event.target as Node)) {
        setShowVolumeSlider(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

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
    setIsMuted(newVolume === 0)
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)
  }

  const toggleVolumeSlider = () => {
    setShowVolumeSlider(!showVolumeSlider)
  }

  return (
    <CardContent className="p-5 space-y-5">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentTrackIndex}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="space-y-4"
        >
          <div className={`p-4 rounded-xl bg-gradient-to-r ${currentTrack.bgColor}`}>
            <div className="flex items-center gap-4">
              <motion.div
                animate={{
                  rotate: isPlaying ? 360 : 0,
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  rotate: { duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
                  scale: { duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
                }}
                className={`w-14 h-14 rounded-full flex items-center justify-center bg-gradient-to-r ${currentTrack.color} shadow-lg`}
              >
                <Disc className="h-7 w-7 text-white" />
              </motion.div>

              <div className="flex-1">
                <motion.h3 initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="font-medium text-lg text-white">
                  {currentTrack.title}
                </motion.h3>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, transition: { delay: 0.1 } }}
                  className="text-slate-300 text-sm"
                >
                  {currentTrack.artist}
                </motion.p>
              </div>

              <div className="relative" ref={volumeControlRef}>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleVolumeSlider}
                  className="text-slate-300 hover:text-white hover:bg-slate-800/50"
                >
                  {isMuted ? <VolumeX size={18} /> : volume < 0.5 ? <Volume1 size={18} /> : <Volume2 size={18} />}
                </Button>

                <AnimatePresence>
                  {showVolumeSlider && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9, y: 5 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9, y: 5 }}
                      className="absolute right-0 top-full mt-2 p-3 bg-slate-800 rounded-lg shadow-xl z-10 w-40"
                    >
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs text-slate-400">
                          <span>Volume</span>
                          <span>{Math.round(volume * 100)}%</span>
                        </div>
                        <Slider
                          value={[isMuted ? 0 : volume]}
                          max={1}
                          step={0.01}
                          onValueChange={handleVolumeChange}
                          className="w-full"
                        />
                        <Button variant="ghost" size="sm" onClick={toggleMute} className="w-full text-xs mt-1 h-8">
                          {isMuted ? "Unmute" : "Mute"}
                        </Button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>{formatTime(currentTime)}</span>
              <span>{isLoaded ? formatTime(duration) : "--:--"}</span>
            </div>

            <div className="relative h-2">
              {isLoaded ? (
                <Slider
                  value={[currentTime]}
                  max={duration || 100}
                  step={0.01}
                  onValueChange={handleSeek}
                  className="w-full"
                />
              ) : (
                <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                  <motion.div
                    animate={{ x: ["0%", "100%", "0%"] }}
                    transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                    className={`h-full w-1/4 bg-gradient-to-r ${currentTrack.color}`}
                  />
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-center items-center space-x-6 pt-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={handlePrevTrack}
              className="rounded-full hover:bg-slate-800/50 text-slate-300 hover:text-white transition-colors"
            >
              <SkipBack size={20} />
            </Button>

            <Button
              onClick={handlePlayPause}
              className={`rounded-full w-14 h-14 p-0 bg-gradient-to-r ${currentTrack.color} hover:opacity-90 transition-opacity shadow-lg`}
            >
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                {isPlaying ? <Pause size={24} /> : <Play size={24} className="ml-1" />}
              </motion.div>
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={handleNextTrack}
              className="rounded-full hover:bg-slate-800/50 text-slate-300 hover:text-white transition-colors"
            >
              <SkipForward size={20} />
            </Button>
          </div>
        </motion.div>
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-center pt-2"
      >
        <Button
          variant="outline"
          size="sm"
          asChild
          className={`rounded-full bg-gradient-to-r ${currentTrack.bgColor} border-slate-700/50 hover:border-slate-600/50 text-slate-200`}
        >
          <Link href={currentTrack.videoLink} target="_blank">
            <ExternalLink size={14} className="mr-2" />
            Watch video
          </Link>
        </Button>
      </motion.div>

      <audio ref={audioRef} src={currentTrack.src} onEnded={handleNextTrack} preload="metadata" />
    </CardContent>
  )
}


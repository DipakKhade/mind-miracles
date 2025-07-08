"use client"

import { useEffect, useRef, useState } from "react"
import { Play, Pause, Volume2, VolumeX, Maximize, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { cn } from "@/lib/utils"

interface VimeoPlayerProps {
  vimeoId: string
  autoplay?: boolean
  muted?: boolean
  loop?: boolean
  controls?: boolean
  responsive?: boolean
}

export default function VimeoPlayer({
  vimeoId,
  autoplay = false,
  muted = false,
  loop = false,
  controls = true,
  responsive = true,
}: VimeoPlayerProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(muted)
  const [volume, setVolume] = useState([100])
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [showControls, setShowControls] = useState(true)
  const [isFullscreen, setIsFullscreen] = useState(false)

  // Vimeo Player API integration
  useEffect(() => {
    const script = document.createElement("script")
    script.src = "https://player.vimeo.com/api/player.js"
    script.async = true
    document.head.appendChild(script)

    script.onload = () => {
      if (iframeRef.current && window.Vimeo) {
        const player = new window.Vimeo.Player(iframeRef.current)

        // Set up event listeners
        player.on("play", () => {
          setIsPlaying(true)
          setIsLoading(false)
        })

        player.on("pause", () => setIsPlaying(false))
        player.on("ended", () => setIsPlaying(false))
        player.on("loaded", () => setIsLoading(false))

        player.on("timeupdate", (data: any) => {
          setCurrentTime(data.seconds)
        })

        player.getDuration().then((duration: number) => {
          setDuration(duration)
        })

        player
          .getVolume()
          .then((vol: number) => {
            setVolume([vol * 100])
          })

        // Store player reference for controls
        ;(containerRef.current as any)._vimeoPlayer = player
      }
    }

    return () => {
      document.head.removeChild(script)
    }
  }, [vimeoId])

  const getPlayer = () => (containerRef.current as any)?._vimeoPlayer

  const togglePlay = async () => {
    const player = getPlayer()
    if (!player) return

    if (isPlaying) {
      await player.pause()
    } else {
      await player.play()
    }
  }

  const toggleMute = async () => {
    const player = getPlayer()
    if (!player) return

    if (isMuted) {
      await player.setVolume(volume[0] / 100)
      setIsMuted(false)
    } else {
      await player.setVolume(0)
      setIsMuted(true)
    }
  }

  const handleVolumeChange = async (newVolume: number[]) => {
    const player = getPlayer()
    if (!player) return

    setVolume(newVolume)
    await player.setVolume(newVolume[0] / 100)
    setIsMuted(newVolume[0] === 0)
  }

  const handleSeek = async (newTime: number[]) => {
    const player = getPlayer()
    if (!player) return

    await player.setCurrentTime(newTime[0])
    setCurrentTime(newTime[0])
  }

  const toggleFullscreen = () => {
    if (!containerRef.current) return

    if (!isFullscreen) {
      containerRef.current.requestFullscreen?.()
      setIsFullscreen(true)
    } else {
      document.exitFullscreen?.()
      setIsFullscreen(false)
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const vimeoUrl = `https://player.vimeo.com/video/${vimeoId}?badge=0&autopause=0&player_id=0&app_id=58479${autoplay ? "&autoplay=1" : ""}${muted ? "&muted=1" : ""}${loop ? "&loop=1" : ""}`

  return (
    <div
      ref={containerRef}
      className={cn("relative group bg-black", responsive ? "aspect-video w-full" : "h-full w-full")}
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      {/* Vimeo iframe */}
      <iframe
        ref={iframeRef}
        src={vimeoUrl}
        className="absolute inset-0 h-full w-full"
        frameBorder="0"
        allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
        allowFullScreen
        title={`Vimeo video ${vimeoId}`}
      />

      {/* Loading overlay */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50">
          <Loader2 className="h-8 w-8 animate-spin text-white" />
        </div>
      )}

      {/* Custom controls overlay */}
      {controls && (
        <div
          className={cn(
            "absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-4 transition-opacity duration-300",
            showControls ? "opacity-100" : "opacity-0",
          )}
        >
          {/* Progress bar */}
          <div className="mb-4">
            <Slider value={[currentTime]} max={duration} step={1} onValueChange={handleSeek} className="w-full" />
            <div className="mt-1 flex justify-between text-xs text-white/70">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          {/* Control buttons */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" onClick={togglePlay} className="text-white hover:bg-white/20">
                {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              </Button>

              <Button variant="ghost" size="sm" onClick={toggleMute} className="text-white hover:bg-white/20">
                {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
              </Button>

              <div className="flex items-center gap-2">
                <Slider value={volume} max={100} step={1} onValueChange={handleVolumeChange} className="w-20" />
              </div>
            </div>

            <Button variant="ghost" size="sm" onClick={toggleFullscreen} className="text-white hover:bg-white/20">
              <Maximize className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

// Extend Window interface for Vimeo Player
declare global {
  interface Window {
    Vimeo: any
  }
}

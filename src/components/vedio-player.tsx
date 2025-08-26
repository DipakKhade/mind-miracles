'use client';

import { useEffect, useRef, useState } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { cn } from '@/lib/utils';
import { useVideoProgress } from '@/hooks/use-video-pregress';
import { getVideoProgress } from '@/actions/progress';
import Script from 'next/script';

interface VimeoPlayerProps {
  vimeoId: string;
  videoId: string; // Add this - the database video ID
  autoplay?: boolean;
  muted?: boolean;
  loop?: boolean;
  controls?: boolean;
  responsive?: boolean;
  onProgressUpdate?: (progress: number, completed: boolean) => void;
}

export default function VimeoPlayer({
  videoId,
  vimeoId,
  autoplay = false,
  muted = false,
  loop = false,
  controls = true,
  responsive = true,
  onProgressUpdate,
}: VimeoPlayerProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(muted);
  const [volume, setVolume] = useState([100]);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [showControls, setShowControls] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [initialProgress, setInitialProgress] = useState<number>(0);

  const { saveProgress, forceSync } = useVideoProgress({
    videoId,
    onProgressUpdate,
  });

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://player.vimeo.com/api/player.js';
    script.async = true;
    document.head.appendChild(script);

    script.onload = async () => {
      if (iframeRef.current && window.Vimeo) {
        const player = new window.Vimeo.Player(iframeRef.current);

        try {
          const progressResult = await getVideoProgress({ videoId });
          if (progressResult.success && progressResult.data) {
            const savedProgress = progressResult.data.progress;
            setInitialProgress(savedProgress);

            // Seek to saved position if progress > 5%
            if (savedProgress > 5) {
              const duration = await player.getDuration();
              const seekTime = (savedProgress / 100) * duration;
              await player.setCurrentTime(seekTime);
            }
          }
        } catch (error) {
          console.error('Failed to load initial progress:', error);
        }

        // Set up event listeners
        player.on('play', () => {
          setIsPlaying(true);
          setIsLoading(false);
        });

        player.on('pause', () => setIsPlaying(false));

        player.on('ended', async () => {
          setIsPlaying(false);
          // Force sync when video ends
          const duration = await player.getDuration();
          await forceSync(duration, duration);
        });

        player.on('loaded', () => setIsLoading(false));

        player.on('timeupdate', async (data: any) => {
          setCurrentTime(data.seconds);

          // Save progress periodically
          const duration = await player.getDuration();
          await saveProgress(data.seconds, duration);
        });

        player.getDuration().then((duration: number) => {
          setDuration(duration);
        });

        player.getVolume().then((vol: number) => {
          setVolume([vol * 100]);
        });

        // Store player reference for controls
        (containerRef.current as any)._vimeoPlayer = player;
      }
    };

    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, [vimeoId, videoId, saveProgress, forceSync]);

  useEffect(() => {
    return () => {
      // Force sync progress when component unmounts
      if (currentTime > 0 && duration > 0) {
        forceSync(currentTime, duration);
      }
    };
  }, [currentTime, duration, forceSync]);

  const getPlayer = () => (containerRef.current as any)?._vimeoPlayer;

  const togglePlay = async () => {
    const player = getPlayer();
    if (!player) return;

    if (isPlaying) {
      await player.pause();
    } else {
      await player.play();
    }
  };

  const toggleMute = async () => {
    const player = getPlayer();
    if (!player) return;

    if (isMuted) {
      await player.setVolume(volume[0] / 100);
      setIsMuted(false);
    } else {
      await player.setVolume(0);
      setIsMuted(true);
    }
  };

  const handleVolumeChange = async (newVolume: number[]) => {
    const player = getPlayer();
    if (!player) return;

    setVolume(newVolume);
    await player.setVolume(newVolume[0] / 100);
    setIsMuted(newVolume[0] === 0);
  };

  const handleSeek = async (newTime: number[]) => {
    const player = getPlayer();
    if (!player) return;

    await player.setCurrentTime(newTime[0]);
    setCurrentTime(newTime[0]);
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;

    if (!isFullscreen) {
      containerRef.current.requestFullscreen?.();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen?.();
      setIsFullscreen(false);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const vimeoUrl = `https://player.vimeo.com/video/${vimeoId}?badge=0&autopause=0&player_id=0&app_id=58479${autoplay ? '&autoplay=1' : ''}${muted ? '&muted=1' : ''}${loop ? '&loop=1' : ''}`;

  return (
    <div
    ref={containerRef}
    className={cn("group relative bg-black", responsive ? "" : "")}
    onMouseEnter={() => setShowControls(true)}
    onMouseLeave={() => setShowControls(false)}
  >
    <div style={{ paddingBottom: "56.25%", position: "relative", height: 0 }}>
      <iframe
        src={`https://player.vimeo.com/video/${vimeoId}?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479`}
        frameBorder="0"
        allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        style={{
          position: "absolute",
          top: "0",
          left: "0",
          width: "100%",
          height: "100%",
        }}
        title="Day 1"
      ></iframe>
    </div>
    <Script src="https://player.vimeo.com/api/player.js"></Script>
  </div>
  );
}

// Extend Window interface for Vimeo Player
declare global {
  interface Window {
    Vimeo: any;
  }
}

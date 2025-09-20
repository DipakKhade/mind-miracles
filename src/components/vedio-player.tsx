'use client';

import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { useVideoProgress } from '@/hooks/use-video-pregress';
import { getVideoProgress } from '@/actions/progress';
import Script from 'next/script';

interface VimeoPlayerProps {
  vimeoId: string;
  videoId: string; // the database video ID
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
  const [volume, setVolume] = useState([100]);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [showControls, setShowControls] = useState(true);
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

  return (
    <div
      ref={containerRef}
      className={cn('group relative bg-black', responsive ? '' : '')}
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      <div style={{ paddingBottom: '56.25%', position: 'relative', height: 0 }}>
        <iframe
          ref={iframeRef}
          src={`https://player.vimeo.com/video/${vimeoId}?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479`}
          frameBorder="0"
          allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          style={{
            position: 'absolute',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
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

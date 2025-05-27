'use client';

import { useEffect, useState, useRef } from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';

export default function VideoPlayer() {
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [videoId, setVideoId] = useState<string | null>('test.mp4');
  const [error, setError] = useState<string | null>(null);

  const videoRef = useRef<HTMLDivElement | null>(null);
  const playerRef = useRef<any>(null);

  const onReady = (player: any) => {
    console.log("player is ready");
    
    // Add error handling for the player
    player.on('error', () => {
      const error = player.error();
      console.error('Video.js error:', error);
      setError(`Video error: ${error?.message || 'Unknown error'}`);
    });
  };

  // Function to determine MIME type from file extension
  const getMimeType = (url: string) => {
    const extension = url.split('.').pop()?.toLowerCase();
    switch (extension) {
      case 'mp4':
        return 'video/mp4';
      case 'mov':
        return 'video/quicktime';
      case 'webm':
        return 'video/webm';
      case 'ogg':
        return 'video/ogg';
      default:
        return 'video/mp4';
    }
  };

  useEffect(() => {
    const fetchUrl = async () => {
      try {
        setError(null);
        const res = await fetch(`/api/signed-url?videoId=${videoId}`);
        if (res.ok) {
          const data = await res.json();
          console.log('Fetched video URL:', data.url);
          setVideoUrl(data.url);
        } else {
          setError(`Failed to fetch video URL: ${res.status}`);
        }
      } catch (error) {
        console.error('Error fetching video URL:', error);
        setError('Network error while fetching video URL');
      }
    };
    
    if (videoId) {
      fetchUrl();
    }
  }, [videoId]);

  useEffect(() => {
    // Only initialize player when we have a video URL
    if (!videoUrl) return;

    // Clean up existing player if it exists
    if (playerRef.current && !playerRef.current.isDisposed()) {
      playerRef.current.dispose();
      playerRef.current = null;
    }

    // Clear the container
    if (videoRef.current) {
      videoRef.current.innerHTML = '';
    }

    // Create new video element
    const videoElement = document.createElement("video-js");
    videoElement.classList.add('vjs-big-play-centered');
    videoRef.current?.appendChild(videoElement);

    const mimeType = getMimeType(videoUrl);
    console.log('Using MIME type:', mimeType, 'for URL:', videoUrl);

    const options = {
      autoplay: false,
      controls: true,
      responsive: true,
      fluid: true,
      preload: 'metadata',
      sources: [
        {
          src: videoUrl,
          type: 'video/mp4',
        },
      ],
      // Remove VHS and native overrides for simple MP4 playback
      techOrder: ['html5'],
      html5: {
        vhs: {
          overrideNative: false
        }
      }
    };

    try {
      const player = playerRef.current = videojs(videoElement, options, () => {
        videojs.log('player is ready');
        onReady && onReady(player);
      });

      // Add additional error handling
      player.ready(() => {
        player.on('loadstart', () => console.log('Load start'));
        player.on('loadeddata', () => console.log('Loaded data'));
        player.on('canplay', () => console.log('Can play'));
        player.on('error', () => {
          const error = player.error();
          console.error('Player error:', error);
          setError(`Playback error: ${error?.message || 'Unknown playback error'}`);
        });
      });

    } catch (err) {
      console.error('Error initializing player:', err);
      setError('Failed to initialize video player');
    }
  }, [videoUrl]);

  useEffect(() => {
    // Cleanup function
    return () => {
      const player = playerRef.current;
      if (player && !player.isDisposed()) {
        player.dispose();
        playerRef.current = null;
      }
    };
  }, []);

  if (error) {
    return (
      <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded">
        <p>Error: {error}</p>
        <button 
          onClick={() => {
            setError(null);
            setVideoUrl(null);
            // Trigger refetch
            setVideoId(prev => prev);
          }}
          className="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Retry
        </button>
      </div>
    );
  }

  if (!videoUrl) {
    return <p>Loading video...</p>;
  }

  return (
    <div>
      <div data-vjs-player>
        <div ref={videoRef} />
      </div>
      {/* Debug info - remove in production */}
      <div className="mt-2 text-sm text-gray-600">
        <p>Video ID: {videoId}</p>
        <p>URL: {videoUrl}</p>
      </div>
    </div>
  );
}
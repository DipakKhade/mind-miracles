'use client';

import { useEffect, useState, useRef } from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';

export default function VideoPlayer() {
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [videoId, setVideoId] = useState<string | null>(
    'test.mp4',
  );

  const videoRef = useRef<HTMLDivElement | null>(null);
  const playerRef = useRef<any>(null);

  const onReady = (player: any) => {
    console.log("player is ready");
  };

  useEffect(() => {
    const fetchUrl = async () => {
      try {
        const res = await fetch(`/api/signed-url?videoId=${videoId}`);
        if (res.ok) {
          const data = await res.json();
          setVideoUrl(data.url);
        }
      } catch (error) {
        console.error('Error fetching video URL:', error);
      }
    };
    
    if (videoId) {
      fetchUrl();
    }
  }, [videoId]);

  useEffect(() => {
    // Only initialize player when we have a video URL
    if (!videoUrl) return;

    // Make sure Video.js player is only initialized once
    if (!playerRef.current) {
      // The Video.js player needs to be _inside_ the component el for React 18 Strict Mode. 
      const videoElement = document.createElement("video-js");
      
      videoElement.classList.add('vjs-big-play-centered');
      videoRef.current?.appendChild(videoElement);

      const options = {
        autoplay: true,
        controls: true,
        responsive: true,
        fluid: true,
        sources: [
          {
            src: videoUrl,
            type: "video/mp4",
          },
        ],
      };

      const player = playerRef.current = videojs(videoElement, options, () => {
        videojs.log('player is ready');
        onReady && onReady(player);
      });

    } else {
      // Update existing player with new video URL
      const player = playerRef.current;
      
      player.src([{
        src: videoUrl,
        type: "video/mp4",
      }]);
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

  if (!videoUrl) {
    return <p>Loading video...</p>;
  }

  return (
    <div data-vjs-player>
      <div ref={videoRef} />
    </div>
  );
}
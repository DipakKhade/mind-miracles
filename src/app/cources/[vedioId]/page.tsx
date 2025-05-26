'use client';

import React from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';

export const Page = (props:any) => {
  const videoRef = React.useRef(null);
  const playerRef = React.useRef(null);
  const {options, onReady} = props;

  React.useEffect(() => {

    // Make sure Video.js player is only initialized once
    if (!playerRef.current) {
      // The Video.js player needs to be _inside_ the component el for React 18 Strict Mode. 
      const videoElement = document.createElement("video-js");

      videoElement.classList.add('vjs-big-play-centered');
      videoRef.current?.appendChild(videoElement);

      videojs(videoElement, {
        autoplay: true,
        sources: [
          {
            src: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
            type: 'video/mp4'
          }
        ],
        controls: true,
        responsive: true,
        fluid: true,
        aspectRatio: '12:7',
        playbackRates: [0.5, 1, 1.25, 1.5, 1.75, 2],
      })

      const player = playerRef.current = videojs(videoElement, options, () => {
        videojs.log('player is ready');
        onReady && onReady(player);
      });

    // You could update an existing player in the `else` block here
    // on prop change, for example:
    } else {
      const player = playerRef.current;

      player.autoplay(options.autoplay);
      player.src(options.sources);
    }
  }, [options, videoRef]);

  // Dispose the Video.js player when the functional component unmounts
  React.useEffect(() => {
    const player = playerRef.current;

    return () => {
      if (player && !player.isDisposed()) {
        player.dispose();
        playerRef.current = null;
      }
    };
  }, [playerRef]);

  return (
    <div
      data-vjs-player
      style={{ maxWidth: '1350px', margin: '0 auto', width: '100%' }}
    >
      <div ref={videoRef} style={{ width: '100%', height: 'auto' }} />
    </div>
  );
}

export default Page;
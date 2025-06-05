'use client';

import { useEffect, useState, useRef } from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';

export default function VideoPlayer({ videoId }: { videoId: string }) {
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [manifestContent, setManifestContent] = useState<string | null>(null);

  const videoRef = useRef<HTMLDivElement | null>(null);
  const playerRef = useRef<any>(null);
  const blobUrlRef = useRef<string | null>(null);

  const onReady = (player: any) => {
    console.log('player is ready');

    player.on('error', () => {
      const error = player.error();
      console.error('Video.js error:', error);
      setError(`Video error: ${error?.message || 'Unknown error'}`);
    });
  };

  const isHLSManifest = (content: string) => {
    return (
      content.trim().startsWith('#EXTM3U') ||
      content.trim().startsWith('#EXT-X-VERSION')
    );
  };

  const isHLSUrl = (url: string) => {
    return (
      url.includes('.m3u8') ||
      url.includes('application/vnd.apple.mpegurl') ||
      url.startsWith('blob:')
    );
  };

  const createManifestBlobUrl = (manifestContent: string) => {
    if (blobUrlRef.current) {
      URL.revokeObjectURL(blobUrlRef.current);
    }

    const blob = new Blob([manifestContent], {
      type: 'application/vnd.apple.mpegurl',
    });
    const blobUrl = URL.createObjectURL(blob);
    blobUrlRef.current = blobUrl;
    return blobUrl;
  };

  const getMimeType = (url: string) => {
    if (isHLSUrl(url)) {
      return 'application/vnd.apple.mpegurl';
    }

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
        console.log('Fetching video data for ID:', videoId);

        const res = await fetch(`/api/course/view?video=${videoId}`);
        if (res.ok) {
          const data = await res.json();
          console.log('Fetched video data:', data);

          if (typeof data.url === 'string') {
            if (isHLSManifest(data.url)) {
              setManifestContent(data.url);
              const blobUrl = createManifestBlobUrl(data.url);
              setVideoUrl(blobUrl);
            } else {
              setVideoUrl(data.url);
              setManifestContent(null);
            }
          } else {
            throw new Error('Invalid response format');
          }
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
    if (!videoUrl) return;

    if (playerRef.current && !playerRef.current.isDisposed()) {
      playerRef.current.dispose();
      playerRef.current = null;
    }

    if (videoRef.current) {
      videoRef.current.innerHTML = '';
    }

    const videoElement = document.createElement('video-js');
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
          type: mimeType,
        },
      ],
      techOrder: ['html5'],
      html5: {
        vhs: {
          overrideNative: true,
          withCredentials: false,
          xhr: {
            beforeRequest: (options: any) => {
              if (options.uri && options.uri.startsWith('blob:')) {
                return options;
              }
              return options;
            },
          },
        },
        nativeVideoTracks: false,
        nativeAudioTracks: false,
        nativeTextTracks: false,
      },
      debug: true,
    };

    try {
      const player = (playerRef.current = videojs(videoElement, options, () => {
        videojs.log('player is ready');
        onReady && onReady(player);
      }));

      player.ready(() => {
        player.on('loadstart', () => console.log('Load start'));
        player.on('loadeddata', () => console.log('Loaded data'));
        player.on('loadedmetadata', () => console.log('Loaded metadata'));
        player.on('canplay', () => console.log('Can play'));
        player.on('canplaythrough', () => console.log('Can play through'));

        player.on('sourceopen', () => console.log('Source opened'));
        player.on('waiting', () => console.log('Waiting for data'));

        player.on('error', () => {
          const error = player.error();
          console.error('Player error:', error);

          if (error && error.code === 4) {
            setError(
              'Media error: The video format is not supported or the file is corrupted',
            );
          } else if (error && error.code === 2) {
            setError(
              'Network error: Unable to load video segments. URLs may have expired.',
            );
          } else {
            setError(
              `Playback error: ${error?.message || 'Unknown playback error'}`,
            );
          }
        });

        //@ts-ignore
        if (player.tech() && player.tech().vhs) {
          console.log('VHS tech is active for HLS playback');

          //@ts-ignore
          const vhs = player.tech().vhs;

          vhs.on('error', (event: any) => {
            console.error('VHS error:', event);
          });

          vhs.on('loadedplaylist', () => {
            console.log('HLS playlist loaded');
          });

          let segmentErrors = 0;
          vhs.on('mediaerror', () => {
            segmentErrors++;
            console.warn(`HLS segment error #${segmentErrors}`);

            if (segmentErrors > 3) {
              setError(
                'Multiple segment loading errors. Video URLs may have expired.',
              );
            }
          });
        }
      });
    } catch (err) {
      console.error('Error initializing player:', err);
      setError('Failed to initialize video player');
    }
  }, [videoUrl]);

  useEffect(() => {
    return () => {
      const player = playerRef.current;
      if (player && !player.isDisposed()) {
        player.dispose();
        playerRef.current = null;
      }

      if (blobUrlRef.current) {
        URL.revokeObjectURL(blobUrlRef.current);
        blobUrlRef.current = null;
      }
    };
  }, []);

  if (error) {
    return (
      <div className="rounded border border-red-400 bg-red-100 p-4 text-red-700">
        <p>Error: {error}</p>
        <button
          onClick={() => {
            setError(null);
            setVideoUrl(null);
            setManifestContent(null);
            // Clean up blob URL
            if (blobUrlRef.current) {
              URL.revokeObjectURL(blobUrlRef.current);
              blobUrlRef.current = null;
            }
          }}
          className="mt-2 rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
        >
          Retry
        </button>
        {manifestContent && (
          <details className="mt-4">
            <summary className="cursor-pointer font-semibold">
              Show Manifest Content
            </summary>
            <pre className="mt-2 overflow-auto bg-gray-100 p-2 text-xs">
              {manifestContent}
            </pre>
          </details>
        )}
      </div>
    );
  }

  if (!videoUrl) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
          <p>Loading video...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div
        data-vjs-player
        style={{ maxWidth: '1350px', margin: '0 auto', width: '100%' }}
      >
        <div ref={videoRef} style={{ width: '100%', height: 'auto' }} />
      </div>
    </div>
  );
}

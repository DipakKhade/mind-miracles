'use client';

import { useEffect, useState } from 'react';

export default function Page() {
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [videoId, setVideoId] = useState<string | null>(
    '2025-03-12 18-06-18.mov',
  );

  useEffect(() => {
    const fetchUrl = async () => {
      const res = await fetch(`/api/signed-url?videoId=${videoId}`);
      if (res.ok) {
        const data = await res.json();
        setVideoUrl(data.url);
      }
    };
    fetchUrl();
  }, [videoId]);

  if (!videoUrl) return <p>Loading video...</p>;

  return (
    <>
      <video controls width="100%" src={videoUrl} />
    </>
  );
}

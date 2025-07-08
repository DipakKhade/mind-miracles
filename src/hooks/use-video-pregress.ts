'use client';

import { updateVideoProgress } from '@/actions/progress';
import { useCallback, useRef } from 'react';

interface UseVideoProgressProps {
  videoId: string;
  onProgressUpdate?: (progress: number, completed: boolean) => void;
}

export function useVideoProgress({
  videoId,
  onProgressUpdate,
}: UseVideoProgressProps) {
  const lastSavedProgress = useRef<number>(0);
  const saveTimeoutRef = useRef<NodeJS.Timeout>();

  const saveProgress = useCallback(
    async (currentTime: number, duration: number, force = false) => {
      if (!duration || duration === 0) return;

      const progress = Math.min((currentTime / duration) * 100, 100);
      const completed = progress >= 95;

      const progressDiff = Math.abs(progress - lastSavedProgress.current);

      if (!force && progressDiff < 5 && !completed) {
        return;
      }

      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }

      saveTimeoutRef.current = setTimeout(async () => {
        try {
          const result = await updateVideoProgress({
            videoId,
            progress,
            completed,
          });

          if (result.success) {
            lastSavedProgress.current = progress;
            onProgressUpdate?.(progress, completed);
          }
        } catch (error) {
          console.error('Failed to save video progress:', error);
        }
      }, 1000); 
    },
    [videoId, onProgressUpdate],
  );

  const forceSync = useCallback(
    async (currentTime: number, duration: number) => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
      await saveProgress(currentTime, duration, true);
    },
    [saveProgress],
  );

  return { saveProgress, forceSync };
}

export function VideoPlayerSkeleton() {
  return (
    <div className="flex aspect-video w-full animate-pulse items-center justify-center bg-muted">
      <div className="flex flex-col items-center gap-2">
        <div className="h-12 w-12 rounded-full bg-muted-foreground/20" />
        <div className="h-4 w-32 rounded bg-muted-foreground/20" />
      </div>
    </div>
  );
}

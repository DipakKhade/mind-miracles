export function CourseViewSkeleton() {
    return (
      <div className="animate-pulse">
        {/* Header Skeleton */}
        <header className="border-b border-gray-200 bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="h-10 w-40 rounded bg-gray-200" />
              </div>
              <div className="h-4 w-20 rounded bg-gray-200" />
            </div>
          </div>
        </header>
  
        {/* Program Info Skeleton */}
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="space-y-6">
            {/* Title */}
            <div className="h-10 w-3/4 rounded bg-gray-200" />
            
            {/* Description */}
            <div className="space-y-3">
              <div className="h-4 w-full rounded bg-gray-200" />
              <div className="h-4 w-full rounded bg-gray-200" />
              <div className="h-4 w-2/3 rounded bg-gray-200" />
            </div>
  
            {/* Features Grid */}
            <div className="grid gap-4 md:grid-cols-2">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="space-y-2 rounded-lg bg-gray-100 p-4">
                  <div className="h-5 w-5 rounded-full bg-gray-200" />
                  <div className="h-4 w-3/4 rounded bg-gray-200" />
                </div>
              ))}
            </div>
          </div>
        </div>
  
        {/* Video Preview Skeleton */}
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="h-96 w-full rounded-lg bg-gray-200" />
        </div>
  
        {/* Fee Info Skeleton */}
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="rounded-lg border border-gray-200 bg-gray-50 p-6">
            <div className="h-8 w-40 rounded bg-gray-200" />
            <div className="mt-4 h-12 w-full rounded bg-gray-300" />
          </div>
        </div>
      </div>
    );
  }
  
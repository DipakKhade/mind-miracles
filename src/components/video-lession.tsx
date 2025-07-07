"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, ArrowRight, BookOpen } from "lucide-react"
import VimeoPlayer from "./vedio-player"

interface VideoLessonProps {
  video: {
    id: string
    title: string
    description: string
    vimeoId: string
    dayNumber: number
    progress: number
    completed: boolean
  }
  onProgressUpdate?: (videoId: string, progress: number) => void
  onComplete?: (videoId: string) => void
  onNext?: () => void
  onPrevious?: () => void
  hasNext?: boolean
  hasPrevious?: boolean
}

export default function VideoLesson({
  video,
  onProgressUpdate,
  onComplete,
  onNext,
  onPrevious,
  hasNext = false,
  hasPrevious = false,
}: VideoLessonProps) {
  const [localProgress, setLocalProgress] = useState(video.progress)

  const handleProgressUpdate = (progress: number, currentTime: number, duration: number) => {
    setLocalProgress(progress)
    onProgressUpdate?.(video.id, progress)
  }

  const handleComplete = () => {
    onComplete?.(video.id)
  }

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      {/* Navigation */}
      <div className="flex items-center justify-between">
        <Button variant="ghost" size="sm">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Course
        </Button>
        <Badge variant="outline">Day {video.dayNumber}</Badge>
      </div>

      {/* Video Player */}
      <VimeoPlayer
        vimeoId={video.vimeoId}
        title={video.title}
        description={video.description}
        initialProgress={video.progress}
        onProgressUpdate={handleProgressUpdate}
        onComplete={handleComplete}
        className="shadow-lg"
      />

      {/* Lesson Navigation */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center text-sm text-gray-600">
                <BookOpen className="w-4 h-4 mr-2" />
                Lesson {video.dayNumber}
              </div>
              <div className="text-sm text-gray-600">Progress: {Math.round(localProgress)}%</div>
            </div>

            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" onClick={onPrevious} disabled={!hasPrevious}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous
              </Button>
              <Button size="sm" onClick={onNext} disabled={!hasNext} className="bg-green-600 hover:bg-green-700">
                Next
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Additional Content */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-3">About This Lesson</h3>
          <p className="text-gray-600 leading-relaxed">{video.description}</p>
        </CardContent>
      </Card>
    </div>
  )
}

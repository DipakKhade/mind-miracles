import { VideoList } from "@/components/video-list"

export default function Page({params}:{
    params:{
        courseId:string
    }
}) {
    console.log(params)
    return <>
    <VideoList courseId={params.courseId}/>
    </>
}
import { ArrowLeft } from "lucide-react";

export default function CourseTitle({courseTitle}:{courseTitle:string}) {
    return (
        <div className="flex flex-row items-center justify-between">
            <button className="pr-4" onClick={() => window.history.back()}>
            <ArrowLeft className="h-6 w-6 text-gray-400 font-bold text-5xl" />
            </button>
            <div>
                <h1 className="text-2xl font-bold text-gray-900">{courseTitle}</h1>
                <p className="text-gray-600">Continue your learning journey</p>
            </div>
        </div>
    );  
    }
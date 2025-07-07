// import { getServerSession } from 'next-auth';
// import prisma from '@/db';
// import { redirect } from 'next/navigation';
// import { authOptions } from '@/lib/auth_options';
// import VideoPlayer from '@/components/vedio-player';

// interface CoursePageProps {
//   params: {
//     courseId: string;
//   };
// }

// export default async function CoursePage({ params }: CoursePageProps) {
//   const session = await getServerSession(authOptions);
//   if (!session?.user?.email) {
//     redirect('/login');
//   }

//   // Get user from database
//   const user = await prisma.user.findUnique({
//     where: { email: session.user.email },
//     select: { id: true },
//   });

//   if (!user) {
//     redirect('/login');
//   }

//   const course = await prisma.course.findUnique({
//     where: {
//       id: params.courseId,
//       userId: user.id, // Ensure user owns this course
//     },
//     include: {
//       videos: {
//         orderBy: { dayNumber: 'asc' },
//         include: {
//           progress: {
//             where: { userId: user.id },
//           },
//         },
//       },
//     },
//   });

//   if (!course) {
//     return (
//       <div className="container mx-auto px-4 py-8">
//         <div className="text-center">
//           <h1 className="mb-4 text-2xl font-bold text-red-600">
//             Access Denied
//           </h1>
//           <p className="text-gray-600">
//             You don&apos;t have access to this course or it doesn&apos;t exist.
//           </p>
//         </div>
//       </div>
//     );
//   }

//   const purchaseDate = course.createdate;
//   const daysSincePurchase = Math.floor(
//     (Date.now() - purchaseDate.getTime()) / (1000 * 60 * 60 * 24),
//   );

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <div className="mb-8">
//         <h1 className="mb-2 text-3xl font-bold">{course.name}</h1>
//         <p className="text-gray-600">
//           Course started: {new Date(course.from).toLocaleDateString()}
//         </p>
//         <p className="text-gray-600">
//           Days since purchase: {daysSincePurchase + 1}
//         </p>
//       </div>

//       <div className="grid gap-8">
//         {course.videos.map((video) => {
//           const isUnlocked = daysSincePurchase >= video.dayNumber - 1;
//           const progress = video.progress[0]?.progress || 0;
//           const isCompleted = video.progress[0]?.completed || false;

//           return (
//             <div
//               key={video.id}
//               className={`rounded-lg border p-6 ${
//                 isUnlocked
//                   ? 'border-gray-200 bg-white'
//                   : 'border-gray-300 bg-gray-50'
//               }`}
//             >
//               <div className="mb-4 flex items-start justify-between">
//                 <div>
//                   <h2 className="text-xl font-semibold">{video.title}</h2>
//                   <p className="mt-1 text-gray-600">{video.description}</p>
//                   <p className="mt-2 text-sm text-gray-500">
//                     Day {video.dayNumber}
//                     {!isUnlocked &&
//                       ` (Unlocks in ${video.dayNumber - daysSincePurchase - 1} days)`}
//                   </p>
//                 </div>

//                 <div className="flex items-center space-x-2">
//                   {isCompleted && (
//                     <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-semibold text-green-800">
//                       Completed
//                     </span>
//                   )}
//                   {isUnlocked && !isCompleted && progress > 0 && (
//                     <span className="rounded-full bg-blue-100 px-2 py-1 text-xs font-semibold text-blue-800">
//                       {Math.round(progress)}% watched
//                     </span>
//                   )}
//                   {!isUnlocked && (
//                     <span className="rounded-full bg-gray-200 px-2 py-1 text-xs font-semibold text-gray-600">
//                       Locked
//                     </span>
//                   )}
//                 </div>
//               </div>

//               {isUnlocked ? (
//                 <div className="mt-4">
//                   <VideoPlayer videoId={video.id} />
//                 </div>
//               ) : (
//                 <div className="mt-4 rounded-lg bg-gray-100 p-4 text-center">
//                   <p className="text-gray-600">
//                     🔒 This video will unlock on Day {video.dayNumber}
//                   </p>
//                 </div>
//               )}
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }

export default function Page() {
  return (
    <>
      Lorem ipsum dolor, sit amet consectetur adipisicing elit. Culpa laboriosam
      aperiam hic repellendus tenetur aliquid deserunt eligendi sunt expedita,
      recusandae ipsa eum natus, iste quisquam maiores placeat eius facere
      vitae.
    </>
  );
}

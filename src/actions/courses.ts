'use server';

import db from '@/db';

export async function getCourses(email: string) {
  const data = await db.course.findMany({
    include: {
      courseFeature: {
        select: {
          feature: true,
        },
      },
      enrollments: {
        where: {
          user: {
            email: email
          }
        }
      }
    },
  });
  console.log(JSON.stringify(data, null, 2));
  return data;
}

export async function getCourseById(id: string) {
  const data = await db.course.findUnique({
    where: {
      id: id,
    },
    include: {
      courseFeature: {
        select: {
          feature: true,
          featureDesc: true,
        },
      },
    },
  });

  if (!data) {
    throw new Error('Course not found');
  }
  return data;
}

export async function validateUserForVideo(email: string, courseId: string) {
  try {
    const user_course = await db.enrollment.findFirst({
      where: {
        user: {
          email,
        },
        courseId,
      },
    });

    if (user_course) {
      return true;
    }

    return false;
  } catch (e) {
    return false;
  }
}

export async function getVideoMetaData(vid: string) {
  try {
    const metadata = await db.video.findFirst({
      where: {
        id: vid,
      },
      select: {
        title: true,
        description: true,
      },
    });

    return metadata;
  } catch (e) {
    console.log('error at getVideoMetaData ', e);
  }
}

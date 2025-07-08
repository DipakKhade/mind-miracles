'use server';

import db from '@/db';

export async function getCourses() {
  const data = await db.course.findMany({
    include: {
      courseFeature: {
        select: {
          feature: true,
        },
      },
    },
  });
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
        },
      },
    },
  });

  if (!data) {
    throw new Error('Course not found');
  }
  return data;
}

export async function validateUserForVideo(email:string, courseId:string) {
  try {
    const user_course = await db.enrollment.findFirst(({
      where:{ 
        user:{
          email
        },
        courseId
      }
    }))

    if(user_course) {
      return true;
    }

    return false;
  } catch (e){
    return false
  }
}
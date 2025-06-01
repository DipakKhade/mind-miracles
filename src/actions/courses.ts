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
  console.log('data at server', data);
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

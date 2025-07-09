import { PrismaClient } from '@prisma/client';

const db = new PrismaClient();

async function main() {
  // Users
  const user1 = await db.user.create({
    data: {
      name: 'Dipak',
      email: 'dipakhade214@gmail.com',
      password: 'password123',
    },
  });

  const user2 = await db.user.create({
    data: {
      name: 'Bob',
      email: 'bob@example.com',
      password: 'securepass',
    },
  });

  // Courses
  const course1 = await db.course.create({
    data: {
      title: '7 Day Wellness Program',
      description: 'Transform your life in just 7 days.',
      price: 1499,
      thumbnailURL: 'https://via.placeholder.com/150',
      previewURL: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      isPaid: true,
      courseFeature: {
        create: [
          { feature: 'Daily Guided Meditations' },
          { feature: 'Nutrition Advice' },
        ],
      },
      video: {
        create: [
          {
            title: 'Day 1 - Getting Started',
            description: 'Introduction to the program',
            vimeoId: 'vimeo001',
            dayNumber: 1,
          },
          {
            title: 'Day 2 - Breathwork',
            description: 'Breathing exercises',
            vimeoId: 'vimeo002',
            dayNumber: 2,
          },
        ],
      },
    },
  });

  const course2 = await db.course.create({
    data: {
      title: 'Mindfulness Basics',
      description:
        'Learn the core of mindfulness in this beginner-friendly course.',
      price: 999,
      thumbnailURL: 'https://via.placeholder.com/150',
      previewURL: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      isPaid: false,
      courseFeature: {
        create: [
          { feature: 'Audio Sessions' },
          { feature: 'Practical Exercises' },
        ],
      },
      video: {
        create: [
          {
            title: 'Intro to Mindfulness',
            description: 'Understanding the basics',
            vimeoId: 'vimeo003',
            dayNumber: 1,
          },
          {
            title: 'Mindful Walking',
            description: 'Practice walking meditation',
            vimeoId: 'vimeo004',
            dayNumber: 2,
          },
        ],
      },
    },
  });

  // Enrollments and Payments
  const enrollment1 = await db.enrollment.create({
    data: {
      userId: user1.id,
      courseId: course1.id,
      payment: {
        create: {
          amount: 1499,
          method: 'UPI',
          status: 'COMPLETED',
        },
      },
    },
  });

  const enrollment2 = await db.enrollment.create({
    data: {
      userId: user2.id,
      courseId: course2.id,
      payment: {
        create: {
          amount: 999,
          method: 'Credit Card',
          status: 'PENDING',
        },
      },
    },
  });

  // Video Progress
  const videos = await db.video.findMany();

  await db.videoProgress.createMany({
    data: videos.map((video) => ({
      userId: user1.id,
      videoId: video.id,
      progress: 0.5,
      completed: false,
    })),
  });

  console.log('🌱 Seed complete');
}

main()
  .catch((e) => {
    console.error('❌ Seed error:', e);
    process.exit(1);
  })
  .finally(() => db.$disconnect());

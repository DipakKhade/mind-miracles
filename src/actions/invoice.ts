'use server';

import db from '@/db';
import { authOptions } from '@/lib/auth_options';
import { getServerSession } from 'next-auth';

export async function getInvoiceDetails(courseId: string) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      throw new Error('User not authenticated');
    }

    const user = await db.user.findFirst({
      where: {
        email: session.user.email,
      },
      select: {
        id: true,
        email: true,
        whatsAppNo: true,
        name: true,
      },
    });

    if (!user?.id) {
      return { success: false, error: 'User not authenticated' };
    }

    const userEnrollment = await db.enrollment.findFirst({
      where: {
        courseId,
        userId: user.id,
      },
      // select: {
      //     enrolledAt: true
      // },
      include: {
        payment: {
          select: {
            method: true,
            paidAt: true,
            razorpayPaymentId: true,
          },
        },
      },
    });

    if (!userEnrollment) {
      return { success: false, error: 'Course Enrollment not found' };
    }

    const enrolledAtDate = await db.enrollment.findFirst({
      where: {
        id: userEnrollment.id,
      },
      select: {
        enrolledAt: true,
      },
    });

    const courseData = await db.course.findFirst({
      where: {
        id: courseId,
      },
      select: {
        title: true,
        price: true,
      },
    });

    return {
      user,
      userEnrollment,
      courseData,
      enrolledAtDate,
    };
  } catch (error) {
    console.log(error);
  }
}

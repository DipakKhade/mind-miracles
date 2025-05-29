'use server';

import db from "@/db";


export async function getCourses() {
    const data = await db.course.findMany();
    return data;
}
import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(request: Request) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.error();
    }

    const body = await request.json();

    const { name, department_head, start_date } = body;

    if (!name || !department_head || !start_date) {
      return new NextResponse("Fill All Inputs", { status: 400 });
    }

    const findTeacher = await prisma.teacher.findUnique({
      where: {
        id: department_head,
      },
    });

    if (!findTeacher) {
      return new NextResponse("HOD name not found", { status: 400 });
    }

    const department = await prisma.department.create({
      data: {
        department_hod: findTeacher.name,
        department_name: name,
        adminId: user.id,
        teacherId: findTeacher.id,
        start_date: start_date,
      },
    });

    return NextResponse.json(department);
  } catch (error: any) {
    console.log(error, "ADD DEPARTMENT");
  }
}

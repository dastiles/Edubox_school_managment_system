import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";

interface Iparams {
  teacherId: string;
}

export async function DELETE(
  request: Request,
  { params }: { params: Iparams }
) {
  try {
    const adminUser = await getCurrentUser();

    if (!adminUser) {
      return NextResponse.error();
    }

    const { teacherId } = params;

    const teacher = await prisma.teacher.findUnique({
      where: {
        id: teacherId,
      },
    });

    if (!teacher) {
      return new NextResponse("Student Not Found", { status: 400 });
    }

    if (teacher.adminId !== adminUser.id) {
      return new NextResponse("Not Authorised", { status: 400 });
    }

    await prisma.teacher.deleteMany({
      where: {
        id: teacherId,
      },
    });

    return new NextResponse("Teacher deleted succesfully", { status: 200 });
  } catch (error: any) {
    console.log(error, "DELETE TEACHER");
  }
}

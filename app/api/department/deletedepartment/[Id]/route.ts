import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";

interface Iparams {
  Id: string;
}

export async function DELETE(
  request: Request,
  { params }: { params: Iparams }
) {
  try {
    const adminUser = await getCurrentUser();

    if (!adminUser) {
      return new NextResponse("Unauthorized", { status: 400 });
    }

    const { Id } = params;

    const department = await prisma.department.findUnique({
      where: {
        id: Id,
      },
    });

    if (!department) {
      return new NextResponse("Department not Found", { status: 400 });
    }

    if (department.adminId !== adminUser.id) {
      return new NextResponse("UnAuthorized", { status: 400 });
    }

    await prisma.department.deleteMany({
      where: {
        id: Id,
      },
    });

    return new NextResponse("Department Deleted Successfully");
  } catch (error: any) {
    console.log(error, "DELETE DEPARTMENT ERROR");
    return NextResponse.error();
  }
}

import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(request: Request) {
  try {
    const adminUser = await getCurrentUser();

    if (!adminUser) {
      return NextResponse.error();
    }

    const body = await request.json();

    const { staff, start_date, departmentId } = body;

    await Promise.all(
      staff.map(async (option: any) => {
        await prisma.staff.create({
          data: {
            adminId: adminUser.id,
            name: option.value.name,
            email: option.value.email,
            gender: option.value.gender,
            phone: option.value.phone_number,
            start_date,
            department_head: {
              connect: {
                id: departmentId,
              },
            },
            staff: {
              connect: {
                id: option.value.id,
              },
            },
          },
        });
      })
    );
    console.log(staff, departmentId);

    return new NextResponse("done successfully", { status: 200 });
  } catch (error: any) {
    console.log(error);
    return NextResponse.error();
  }
}

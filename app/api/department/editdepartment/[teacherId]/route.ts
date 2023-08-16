import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";

interface Iparams {
  teacherId: string;
}

export async function POST(request: Request, { params }: { params: Iparams }) {
  const user = await getCurrentUser();
  const { teacherId } = params;

  if (!user) {
    return new NextResponse("Unauthorized", { status: 400 });
  }

  const body = await request.json();

  const { name, start_date, department_head } = body;

  if (!name || !start_date || !department_head) {
    return new NextResponse("Inputs are empty", { status: 400 });
  }

  const department = await prisma.department.update({
    where: {
      id: teacherId,
    },
    data: {
      teacherId: department_head,
      start_date,
      department_name: name,
    },
  });

  return NextResponse.json(department);
}

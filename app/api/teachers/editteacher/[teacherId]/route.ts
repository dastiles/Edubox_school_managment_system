import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";

interface Iparams {
  teacherId: string;
}

export async function POST(request: Request, { params }: { params: Iparams }) {
  try {
    const user = await getCurrentUser();
    const { teacherId } = params;

    if (!user) {
      return new NextResponse("Something went wrong", { status: 400 });
    }
    const body = await request.json();
    const {
      email,
      name,
      address,
      phone_number,
      subject_taught,
      date_of_birth,
    } = body;

    if (
      !email ||
      !name ||
      !phone_number ||
      !address ||
      !subject_taught ||
      !date_of_birth
    ) {
      return new NextResponse("Please Fill in all inputs", { status: 400 });
    }

    const regex = /^07\d{8}$/;
    if (!regex.test(phone_number)) {
      return new NextResponse("Invalid Phone number format", { status: 400 });
    }

    const teacher = await prisma.teacher.update({
      where: {
        id: teacherId,
      },
      data: {
        email,
        name,
        address,
        phone_number,
        date_of_birth,
        subject_taught,
      },
    });
    return NextResponse.json(user);
  } catch (error: any) {
    console.log(error);
  }
}

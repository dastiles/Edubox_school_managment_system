import bcrypt from "bcrypt";

import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      email,
      name,
      password,
      confirm_password,
      phone,
      school_name,
      school_email,
      school_phone,
      school_address,
      school_website,
    } = body;

    if (
      !email ||
      !name ||
      !password ||
      !confirm_password ||
      !school_name ||
      !school_email
    ) {
      return new NextResponse("Please Fill in all inputs", { status: 400 });
    }

    const regex_email = /^\S+@\S+\.\S+$/;
    if (!regex_email.test(school_email)) {
      return new NextResponse("School Invalid email", { status: 400 });
    }

    const regex = /^07\d{8}$/;
    if (!regex.test(school_phone)) {
      return new NextResponse("School Invalid Phone number format", {
        status: 400,
      });
    }

    const school = await prisma.school.create({
      data: {
        name: school_name,
        email: school_email,
        phone: school_phone,
        address: school_address,
      },
    });

    if (!regex_email.test(email)) {
      return new NextResponse("Admin Invalid email", { status: 400 });
    }

    if (!regex.test(phone)) {
      return new NextResponse("Admin Invalid Phone number format", {
        status: 400,
      });
    }
    if (password !== confirm_password) {
      return new NextResponse("Password does not match", { status: 400 });
    }

    const uniqueEmail = await prisma.admin.findUnique({
      where: {
        email: email,
      },
    });

    if (uniqueEmail) {
      return new NextResponse("Email Aready registered", { status: 400 });
    }

    const hashedPasssword = await bcrypt.hash(password, 12);

    const user = await prisma.admin.create({
      data: {
        email,
        username: name,
        phone,
        password: hashedPasssword,
        schoolId: school.id,
      },
    });
    return NextResponse.json(user);
  } catch (error: any) {
    console.log(error, "REGISTRATION");
    return new NextResponse("INTERNAL ERROR", { status: 500 });
  }
}

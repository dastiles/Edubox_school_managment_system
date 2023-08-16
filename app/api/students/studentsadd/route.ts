import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(request: Request) {
  try {
    const user = await getCurrentUser();
    let parentId: string;

    // regex
    const regex_email = /^\S+@\S+\.\S+$/;
    const regex = /^07\d{8}$/;

    if (!user) {
      return new NextResponse("Something went wrong", { status: 400 });
    }
    const body = await request.json();
    const {
      email,
      first_name,
      last_name,
      gender,
      address,
      phone_number,
      date_of_birth,
      blood_type,
      parent_address,
      parent_date_of_birth,
      parent_email,
      parent_first_name,
      parent_last_name,
      parent_occupation,
      parent_phone_number,
      parent_company_phone,
      parent_employer,
    } = body;

    if (
      !email ||
      !first_name ||
      !last_name ||
      !gender ||
      !phone_number ||
      !parent_email ||
      !parent_first_name ||
      !parent_last_name ||
      !parent_phone_number
    ) {
      return new NextResponse("Please Fill in required inputs", {
        status: 400,
      });
    }

    if (!regex_email.test(parent_email)) {
      return new NextResponse("Invalid parent email", { status: 400 });
    }

    if (!regex.test(parent_phone_number)) {
      return new NextResponse("Invalid parent Phone number format", {
        status: 400,
      });
    }

    const unique_parentEmail = await prisma.parent.findUnique({
      where: {
        email: email,
      },
    });

    if (unique_parentEmail) {
      parentId = unique_parentEmail.id;
    } else {
      const parent = await prisma.parent.create({
        data: {
          email: parent_email,
          adminId: user.id,
          first_name: parent_first_name,
          last_name: parent_last_name,
          phone: parent_phone_number,
          date_of_birth: parent_date_of_birth,
          address: parent_address,
          occupation: parent_occupation,
          employer: parent_employer,
          company_phone: parent_company_phone,
        },
      });

      parentId = parent.id;
    }

    // sudent code

    if (!regex.test(phone_number)) {
      return new NextResponse("Invalid student Phone number format", {
        status: 400,
      });
    }
    if (!regex_email.test(email)) {
      return new NextResponse("Invalid student email", { status: 400 });
    }

    const uniqueEmail = await prisma.student.findUnique({
      where: {
        email: email,
      },
    });

    if (uniqueEmail) {
      return new NextResponse("Another Student has that email", {
        status: 400,
      });
    }

    const student = await prisma.student.create({
      data: {
        email,
        adminId: user.id,
        first_name,
        last_name,
        blood_type,
        address,
        phone_number,
        gender,
        parentId,
        date_of_birth,
      },
    });
    return NextResponse.json(user);
  } catch (error: any) {
    console.log(error);
  }
}

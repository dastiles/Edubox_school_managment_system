import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(request: Request) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return new NextResponse("Something went wrong", { status: 400 });
    }
    const body = await request.json();
    const { start_date, name, end_date, event_type } = body;

    if (!start_date || !name || !event_type) {
      return new NextResponse("Please Fill in all inputs", { status: 400 });
    }

    const event = await prisma.event.create({
      data: {
        event_type,
        start_date,
        adminId: user.id,
        name,
        end_date,
      },
    });
    return NextResponse.json(event);
  } catch (error: any) {
    console.log(error);
    return new NextResponse("Please Fill in all inputs", { status: 400 });
  }
}

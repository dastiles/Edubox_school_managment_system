import { NextResponse } from "next/server";

import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";



export async function POST(
    request: Request

) {

    const currentUser = await getCurrentUser();

    try {
        const body = await request.json()

        const { username, about, location, phone } = body
        if (!currentUser) {
            return NextResponse.error();
        }

        const regex = /^07\d{8}$/
        if (!regex.test(phone)) {
            return new NextResponse('Invalid Phone number format', { status: 400 })
        }



        const user = await prisma.admin.update({
            where: {
                id: currentUser.id
            },
            data: {
                username, about, location, phone
            }
        });

        return NextResponse.json(user);
    } catch (error: any) {
        console.log(error)
        return new NextResponse('INTERNAL ERROR', { status: 500 })
    }
}

import prisma from '@/app/libs/prismadb'
import { NextResponse } from 'next/server'
import getCurrentUser from "@/app/actions/getCurrentUser";

interface Iparams {
    studentId: string
}

export async function POST(request: Request, { params }: { params: Iparams }) {
    try {
        const user = await getCurrentUser()
        const { studentId } = params

        if (!user) {
            return new NextResponse('Something went wrong', { status: 400 })
        }
        const body = await request.json()
        const { name, address, phone_number } = body

        if (!name) {
            return new NextResponse('Name is required', { status: 400 })
        }

        const regex = /^07\d{8}$/
        if (!regex.test(phone_number)) {
            return new NextResponse('Invalid Phone number format', { status: 400 })
        }



        const student = await prisma.student.update({

            where: {
                id: studentId
            },
            data: {

                name,
                address,
                phone_number,

            }
        })
        return NextResponse.json(user)
    } catch (error: any) {
        console.log(error)
    }
}
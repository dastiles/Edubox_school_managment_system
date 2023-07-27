import prisma from '@/app/libs/prismadb'
import { NextResponse } from 'next/server'
import getCurrentUser from "@/app/actions/getCurrentUser";


export async function POST(request: Request) {
    try {
        const user = await getCurrentUser()

        if (!user) {
            return new NextResponse('Something went wrong', { status: 400 })
        }
        const body = await request.json()
        const { email, name, address, phone_number, subject_taught, date_of_birth } = body

        if (!email || !name || !phone_number || !address || !subject_taught || !date_of_birth) {
            return new NextResponse('Please Fill in all inputs', { status: 400 })
        }
        const regex_email = /^\S+@\S+\.\S+$/
        if (!regex_email.test(email)) {
            return new NextResponse('Invalid email', { status: 400 })
        }

        const uniqueEmail = await prisma.teacher.findUnique({
            where: {
                email: email
            }
        })

        if (uniqueEmail) {
            return new NextResponse('Another Teacher has that email', { status: 400 })
        }



        const teacher = await prisma.teacher.create({
            data: {
                email,
                adminId: user.id,
                name,
                address,
                phone_number,
                date_of_birth,
                subject_taught,

            }
        })
        return NextResponse.json(teacher)
    } catch (error: any) {
        console.log(error)
    }
}
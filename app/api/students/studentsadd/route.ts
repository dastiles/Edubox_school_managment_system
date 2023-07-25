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
        const { email, name, address, phone_number } = body

        if (!email || !name || !phone_number || !address) {
            return new NextResponse('Please Fill in all inputs', { status: 400 })
        }
        const regex_email = /^\S+@\S+\.\S+$/
        if (!regex_email.test(email)) {
            return new NextResponse('Invalid email', { status: 400 })
        }

        const uniqueEmail = await prisma.student.findUnique({
            where: {
                email: email
            }
        })

        if (uniqueEmail) {
            return new NextResponse('Another Student has that email', { status: 400 })
        }

        console.log(body)

        const student = await prisma.student.create({
            data: {
                email,
                adminId: user.id,
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
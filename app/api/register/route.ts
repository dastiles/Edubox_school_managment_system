import bcrypt from 'bcrypt'

import prisma from '@/app/libs/prismadb'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
    try {
        const body = await request.json()

        const { email, username, password, confirm_password } = body

        if (!email || !username || !password || !confirm_password) {
            return new NextResponse('Please Fill in all inputs', { status: 400 })
        }


        const regex_email = /^\S+@\S+\.\S+$/
        if (!regex_email.test(email)) {
            return new NextResponse('Invalid email', { status: 400 })
        }



        if (password !== confirm_password) {
            return new NextResponse('Password does not match', { status: 400 })
        }

        const uniqueEmail = await prisma.admin.findUnique({
            where: {
                email: email
            }
        })

        if (uniqueEmail) {
            return new NextResponse('Email Aready registered', { status: 400 })
        }


        const hashedPasssword = await bcrypt.hash(password, 12)

        const user = await prisma.admin.create({
            data: {
                email,
                username,
                password: hashedPasssword,
                location: '',
                about: '',
                phone: ''
            }
        })
        return NextResponse.json(user)
    } catch (error: any) {
        console.log(error, "REGISTRATION")
        return new NextResponse('INTERNAL ERROR', { status: 500 })
    }

}

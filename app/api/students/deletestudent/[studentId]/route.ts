import prisma from '@/app/libs/prismadb'
import { NextResponse } from 'next/server'
import getCurrentUser from "@/app/actions/getCurrentUser";

interface Iparams {
    studentId: string
}

export async function DELETE(request: Request, { params }: { params: Iparams }) {
    try{

        const adminUser = await getCurrentUser()

        if(!adminUser){
            return NextResponse.error()
        }

        const {studentId} = params

        const student = await prisma.student.findUnique({
            where:{
                id: studentId
            }
        })

        if(!student){
            return new NextResponse('Student Not Found', { status: 400 })
        }

        if(student.adminId !== adminUser.id){
            return new NextResponse('Not Authorised', { status: 400 })
        }

      await prisma.student.deleteMany({
        where:{
            id: studentId
        }
      })

      return new NextResponse('Student deleted succesfully', { status: 200 })

    }catch(error: any){
        console.log(error, 'DELETE STUDENT')
    }
}
import prisma from '@/app/libs/prismadb'
import getCurrentUser from './getCurrentUser'

interface Iparams {
    studentId: string
}
export default async function getStudentById(params: Iparams) {
    try {

        const userAdmin = await getCurrentUser()

        if (!userAdmin) {
            return null
        }

        const { studentId } = params

        const student = await prisma.student.findUnique({
            where: {
                id: studentId
            }
        })

        if (!student) {
            return null
        }

        return student

    } catch (error: any) {
        console.log(error)
        throw new Error(error)
    }
}
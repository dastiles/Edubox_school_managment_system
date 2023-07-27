import prisma from '@/app/libs/prismadb'
import getCurrentUser from '@/app/actions/getCurrentUser'

interface Iparams {
    teacherId: string
}
export default async function getTeacherById(params: Iparams) {
    try {
        const adminUser = await getCurrentUser()

        if (!adminUser) {
            return null
        }

        const { teacherId } = params

        const teacher = await prisma.teacher.findUnique({
            where: {
                id: teacherId
            }
        })

        return teacher
    } catch (error: any) {
        console.log(error)
        throw new Error(error)
    }
}
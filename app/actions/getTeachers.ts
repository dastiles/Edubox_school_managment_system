import prisma from '@/app/libs/prismadb'
import getCurrentUser from './getCurrentUser'

export default async function getTeachers() {
    try {
        const adminUser = await getCurrentUser()

        if (!adminUser) {
            return null
        }

        const teachers = await prisma.teacher.findMany({
            where: {
                adminId: adminUser.id
            }
        })

        if (!teachers) {
            return []
        }

        return teachers

    } catch (error: any) {
        console.log(error)
        throw new Error(error)
    }
}
import prisma from "@/app/libs/prismadb"
import getCurrentUser from "./getCurrentUser"


export default async function getStudents() {
    try {
        const adminUser = await getCurrentUser()

        if (!adminUser) {
            return null
        }

        const students = await prisma.student.findMany({
            where: {
                adminId: adminUser.id
            }

        })

        if (!students) {
            return []
        }

        return students
    } catch (error: any) {
        throw new Error(error)
    }

}
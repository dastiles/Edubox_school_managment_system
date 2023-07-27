import prisma from "@/app/libs/prismadb";
import getCurrentUser from "./getCurrentUser";


export default async function getUpdatedUser(

) {
    try {
        const user = await getCurrentUser()

        if (!user) {
            throw new Error()
        }

        const getUser = await prisma.admin.findUnique({
            where: {
                id: user.id,
            },

        });

        if (!getUser) {
            return null;
        }

        return getUser;
    } catch (error: any) {
        throw new Error(error);
    }
}

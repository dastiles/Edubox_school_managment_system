import prisma from "@/app/libs/prismadb";
import getCurrentUser from "./getCurrentUser";

export default async function getDepartments() {
  try {
    const adminUser = await getCurrentUser();

    if (!adminUser) {
      return null;
    }

    const departments = await prisma.department.findMany({
      where: {
        adminId: adminUser.id,
      },
    });

    if (!departments) {
      return [];
    }

    return departments;
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
}

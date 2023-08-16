import prisma from "@/app/libs/prismadb";
import getCurrentUser from "./getCurrentUser";

interface Iparams {
  teacherId: string;
}

export default async function getDepartmentById(params: Iparams) {
  try {
    const userAdmin = await getCurrentUser();

    if (!userAdmin) {
      return null;
    }

    const { teacherId } = params;

    const department = await prisma.department.findUnique({
      where: {
        id: teacherId,
      },
    });

    return department;
  } catch (error: any) {
    console.log(error, "DELETE DEPARTMENT ERROR");
    throw new Error(error);
  }
}

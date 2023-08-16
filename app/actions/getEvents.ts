import prisma from "@/app/libs/prismadb";
import getCurrentUser from "./getCurrentUser";

export default async function getEvents() {
  try {
    const adminUser = await getCurrentUser();

    if (!adminUser) {
      return null;
    }

    const events = await prisma.event.findMany({
      where: {
        adminId: adminUser.id,
      },
    });

    if (!events) {
      return [];
    }

    return events;
  } catch (error: any) {
    throw new Error(error);
  }
}

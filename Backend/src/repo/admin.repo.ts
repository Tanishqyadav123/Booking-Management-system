import { prisma } from "../../../shared/src/lib/client";

export const getAdminProfileDetails = async (adminId: string) =>
  await prisma.adminUser.findUnique({
    where: {
      id: adminId
    },
    omit: {
      password: true,
      createdAt: true,
      updatedAt: true
    }
  });

import { prisma } from "../../src/utils/database";

export const removeTestDevice = async () => {
  const testDevice = await prisma.device.findFirst({
    where: {
      brand: "Test Brand",
    },
    select: {
      id: true,
    },
  });
  if (testDevice) {
    await prisma.device.delete({
      where: {
        id: testDevice.id,
      },
    });
  }
};

export const createTestDevice = async () => {
  const result = await prisma.device.create({
    data: {
      brand: "Test Brand",
      model: "Test Model",
      os: "Test OS",
      os_version: "Test OS Version",
      processor: "Test Processor",
      ram: 20,
    },
  });

  return result;
};

export const countTestDevice = async () => {
  const result = await prisma.device.count({
    where: {
      brand: "Test Brand",
    },
  });

  return result;
};

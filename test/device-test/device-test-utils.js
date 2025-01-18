import { prisma } from "../../src/utils/database";

export const removeTestDevice = async () => {
  const testDeviceCount = await prisma.device.count({
    where: {
      brand: "Test Brand",
    },
  });

  if (testDeviceCount > 0) {
    await prisma.device.deleteMany({
      where: {
        brand: "Test Brand",
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
      ram: 20.0,
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

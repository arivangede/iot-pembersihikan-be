import { prisma } from "../../src/utils/database";

export const removeTestFishes = async () => {
  await prisma.fishType.deleteMany({
    where: {
      name: "test fish",
    },
  });
};

export const createTestFish = async () => {
  const testFish = await prisma.fishType.create({
    data: {
      name: "test fish",
      cleaning_speed: 2000,
      cleaning_duration: 60000,
    },
  });

  return testFish;
};

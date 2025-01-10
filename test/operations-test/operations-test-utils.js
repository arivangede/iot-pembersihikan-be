import { prisma } from "../../src/utils/database";
import {
  createTestDevice,
  removeTestDevice,
} from "../device-test/device-test-utils";
import {
  createTestFish,
  removeTestFishes,
} from "../fishtypes-test/fish-test-utils";

export const removeTestOperations = async (testId) => {
  const result = await prisma.result.findFirst({
    where: {
      id: testId,
    },
    select: {
      id: true,
      fk_cleaningoperation_id: true,
      fk_performancelog_id: true,
    },
  });

  await prisma.result.delete({
    where: {
      id: result.id,
    },
  });

  await prisma.cleaningOperation.delete({
    where: {
      id: result.fk_cleaningoperation_id,
    },
  });

  await prisma.performanceLog.delete({
    where: {
      id: result.fk_performancelog_id,
    },
  });

  const testDevice = await prisma.device.findFirst({
    where: {
      brand: "Test Brand",
    },
  });

  const testFish = await prisma.fishType.findFirst({
    where: {
      name: "test fish",
    },
  });

  if (testDevice) {
    await removeTestDevice();
  }

  if (testFish) {
    await removeTestFishes();
  }
};

export const createTestOperation = async () => {
  const testDevice = await createTestDevice();
  const testFish = await createTestFish();

  const operation = await prisma.cleaningOperation.create({
    data: {
      start_time: "2024-11-29T12:34:56Z",
      status: "Processing",
      fk_fish_id: testFish.id,
    },
  });

  const performance = await prisma.performanceLog.create({
    data: {
      framework: "test",
      connection_type: "Wi-Fi",
      fk_device_id: testDevice.id,
    },
  });

  const result = await prisma.result.create({
    data: {
      fk_cleaningoperation_id: operation.id,
      fk_performancelog_id: performance.id,
    },
    include: {
      PerformanceLog: true,
      CleaningOperation: true,
    },
  });

  return result;
};

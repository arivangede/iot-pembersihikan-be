import { ResponseError } from "../error/response-error.js";
import { prisma } from "../utils/database.js";
import { createOperationValidation } from "../validations/operation-validation.js";
import { validate } from "../validations/validation.js";
import deviceService from "./device-service.js";
import fishtypesService from "./fishtypes-service.js";

const getAllOperations = async () => {
  const result = await prisma.result.findMany({
    include: {
      CleaningOperation: {
        include: {
          FishType: true,
        },
      },
      PerformanceLog: {
        include: {
          Device: true,
        },
      },
    },
    orderBy: {
      created_at: "desc",
    },
  });

  return result;
};

const getOperationDetailsById = async (operationId) => {
  const result = await prisma.result.findFirst({
    where: {
      id: operationId,
    },
    include: {
      CleaningOperation: {
        include: {
          FishType: true,
        },
      },
      PerformanceLog: {
        include: {
          Device: true,
        },
      },
    },
  });

  if (!result) {
    throw new ResponseError(404, "There is no result data found");
  }

  return result;
};

const getProcessStatus = async (processId) => {
  const process = await prisma.cleaningOperation.findFirst({
    where: {
      id: processId,
    },
  });

  if (!process) {
    throw new ResponseError(
      404,
      "There is no processing operation with the given ID"
    );
  }

  const result = process.status;

  return {
    message: "successfully get process status",
    status: result,
  };
};

const getProcessingOperation = async () => {
  const result = await prisma.cleaningOperation.findMany({
    where: {
      status: "Processing",
    },
    take: 1,
    include: {
      FishType: {
        select: {
          cleaning_speed: true,
          cleaning_duration: true,
        },
      },
    },
  });

  if (result.length === 0) {
    return null;
  }

  return {
    message: "Successfully get processing data",
    process_id: result[0].id,
    clean_speed: result[0].FishType.cleaning_speed,
    clean_duration: result[0].FishType.cleaning_duration,
  };
};

const forceStopCleanProcess = async (processId) => {
  const process = await prisma.cleaningOperation.findFirst({
    where: {
      id: processId,
      status: "Processing",
    },
  });

  if (!process) {
    throw new ResponseError(
      404,
      "There is no processing operation with the given ID"
    );
  }

  const result = await prisma.cleaningOperation.update({
    where: {
      id: processId,
    },
    data: {
      end_time: new Date(),
      status: "Force Stopped",
    },
  });

  return {
    message: "Clean operation successfully stopped",
    data: result,
  };
};

const finishedCleanProcess = async (processId) => {
  const process = await prisma.cleaningOperation.findFirst({
    where: {
      id: processId,
      status: "Processing",
    },
  });

  if (!process) {
    throw new ResponseError(404, "There is no process data found");
  }

  const result = await prisma.cleaningOperation.update({
    where: {
      id: process.id,
    },
    data: {
      end_time: new Date(),
      status: "Finished",
    },
  });

  return {
    message: "Successfully update process to finished",
    data: result,
  };
};

const readCleanLog = async (operationId) => {
  const operation = await getOperationDetailsById(operationId);

  await prisma.result.update({
    where: {
      id: operation.id,
    },
    data: {
      isRead: true,
    },
  });

  return { message: "Read status updated successfully" };
};

const create = async (deviceId, fishId, request) => {
  const isAnotherProcessing = await checkProcessingOperation();

  if (isAnotherProcessing) {
    throw new ResponseError(400, "There is another process on progress");
  }

  const validated = await validate(createOperationValidation, request);
  const fish = await fishtypesService.getFishTypeDataById(fishId);
  const device = await deviceService.getDevicesById(deviceId);

  const cleaningOperation = await prisma.cleaningOperation.create({
    data: {
      fk_fish_id: fish.id,
      start_time: validated.start_time,
      status: "Processing",
    },
  });

  const performanceData = {
    framework: validated.framework,
    connection_type: validated.connection_type,
  };

  if (validated.cellular_generation) {
    performanceData.cellular_generation = validated.cellular_generation;
  }

  const performance = await prisma.performanceLog.create({
    data: {
      ...performanceData,
      fk_device_id: device.id,
    },
  });

  const result = await prisma.result.create({
    data: {
      fk_performancelog_id: performance.id,
      fk_cleaningoperation_id: cleaningOperation.id,
    },
    include: {
      PerformanceLog: true,
      CleaningOperation: true,
    },
  });

  return result;
};

const remove = async (operationId) => {
  const operation = await getOperationDetailsById(operationId);

  // remove operation log
  await prisma.result.delete({
    where: {
      id: operation.id,
    },
  });

  // remove performance Log
  await prisma.performanceLog.delete({
    where: {
      id: operation.fk_performancelog_id,
    },
  });

  // remove clean operation
  await prisma.cleaningOperation.delete({
    where: {
      id: operation.fk_cleaningoperation_id,
    },
  });

  return {
    message: "Operation Log Data Successfully Removed",
  };
};

const checkProcessingOperation = async () => {
  const result = await prisma.cleaningOperation.findMany({
    where: {
      status: "Processing",
    },
  });

  return result.length > 0;
};

export default {
  getAllOperations,
  getOperationDetailsById,
  getProcessStatus,
  getProcessingOperation,
  forceStopCleanProcess,
  finishedCleanProcess,
  readCleanLog,
  create,
  remove,
};

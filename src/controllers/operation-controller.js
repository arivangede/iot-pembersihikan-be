import operationService from "../services/operation-service.js";

const getAllOperations = async (req, res, next) => {
  try {
    const result = await operationService.getAllOperations();
    const dataLength = result.length;

    res.status(200).json({
      message: "Successfully get all operations data",
      dataLength: dataLength,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getOperationDetailsById = async (req, res, next) => {
  try {
    const { operationId } = req.params;
    const result = await operationService.getOperationDetailsById(operationId);

    res.status(200).json({
      message: "Successfully get operation details",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const forceStopCleanProcess = async (req, res, next) => {
  try {
    const { operationId } = req.params;
    const result = await operationService.forceStopCleanProcess(operationId);

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const finishedCleanProcess = async (req, res, next) => {
  try {
    const { processId } = req.params;
    const result = await operationService.finishedCleanProcess(processId);

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const getProcessingOperation = async (req, res, next) => {
  try {
    const result = await operationService.getProcessingOperation();
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const readCleanLog = async (req, res, next) => {
  try {
    const { operationId } = req.params;
    const result = await operationService.readCleanLog(operationId);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  try {
    const { deviceId, fishId } = req.params;
    const result = await operationService.create(deviceId, fishId, req.body);

    res.status(200).json({
      message: "Successfully created new operation",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  try {
    const { operationId } = req.params;
    const result = await operationService.remove(operationId);

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export default {
  getAllOperations,
  getOperationDetailsById,
  forceStopCleanProcess,
  finishedCleanProcess,
  getProcessingOperation,
  readCleanLog,
  create,
  remove,
};

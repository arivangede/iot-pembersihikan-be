import express from "express";
import operationController from "../controllers/operation-controller.js";

export const operationsRouter = new express.Router();
operationsRouter.get("/api/operations", operationController.getAllOperations);
operationsRouter.get(
  "/api/operations/processing",
  operationController.getProcessingOperation
);
operationsRouter.get(
  "/api/operations/:operationId",
  operationController.getOperationDetailsById
);
operationsRouter.get(
  "/api/operations/status/:processId",
  operationController.getProcessStatus
);
operationsRouter.get(
  "/api/operations/force-stop/:processId",
  operationController.forceStopCleanProcess
);
operationsRouter.get(
  "/api/operations/finish/:processId",
  operationController.finishedCleanProcess
);
operationsRouter.get(
  "/api/operations/read/:operationId",
  operationController.readCleanLog
);
operationsRouter.post(
  "/api/operations/:deviceId/:fishId",
  operationController.create
);
operationsRouter.delete(
  "/api/operations/remove/:operationId",
  operationController.remove
);

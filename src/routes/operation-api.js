import express from "express";
import operationController from "../controllers/operation-controller";

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
  "/api/operations/force-stop/:operationId",
  operationController.forceStopCleanProcess
);
operationsRouter.get(
  "/api/operations/finish/:processId",
  operationController.finishedCleanProcess
);
operationsRouter.post(
  "/api/operations/:deviceId/:fishId",
  operationController.create
);
operationsRouter.delete(
  "/api/operations/remove/:operationId",
  operationController.remove
);

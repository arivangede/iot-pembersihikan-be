import deviceController from "../controllers/device-controller.js";
import express from "express";

export const devicesRouter = new express.Router();
devicesRouter.get("/api/devices", deviceController.getAllDevices);
devicesRouter.get("/api/devices/by-id/:deviceId", deviceController.getDeviceById);
devicesRouter.post("/api/devices/register", deviceController.register);
devicesRouter.patch("/api/devices/update/:deviceId", deviceController.update);
devicesRouter.delete("/api/devices/remove/:deviceId", deviceController.remove);

import deviceController from "../controllers/device-controller.js";
import express from "express";

const router = new express.Router();
router.get("/api/devices", deviceController.getAllDevices);
router.get("/api/devices/by-id/:deviceId", deviceController.getDeviceById);
router.post("/api/devices/register", deviceController.register);
router.patch("/api/devices/update/:deviceId", deviceController.update);
router.delete("/api/devices/remove/:deviceId", deviceController.remove);

export { router };
